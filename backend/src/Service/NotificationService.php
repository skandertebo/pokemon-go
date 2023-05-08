<?php
namespace App\Service;

use App\Entity\Notification;
use App\Entity\User;
use App\Entity\UserNotification;
use App\Repository\NotificationRepository;
use App\Repository\UserNotificationRepository;
use App\Repository\UserRepository;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
class NotificationService {
    public function __construct(
        private NotificationRepository $notificationRepository,
        private UserNotificationRepository $userNotificationRepository,
        private EntityManagerInterface $entityManager,
        private UserRepository $userRepository,
        private HubInterface $hub,
        private LoggerInterface $logger
    ){}

    public function publishNotification(User $user, Notification $notification)
    {
        $update = new Update(
            'https://mercure-updates/users/'.strval($user->getId()),
            json_encode(['type' => 'notification',
            'body' => [
                'id' => $notification->getId(),
                'contenu' => $notification->getContenu(),
                'date' => $notification->getDate()->getTimestamp()*1000,
                'user' => $user->getId()
            ]]
        ));

        $this->logger->info('Publishing notification to https://mercure-updates/users/'.strval($user->getId()));


        $this->hub->publish($update);
    }

    public function createNotification(Notification $notification): Notification
    {
        $notification->setDate(new \DateTime());
        $this->notificationRepository->save($notification, true);
        return $notification;
    }
    public function addNotificationToUser($user, Notification $notification): UserNotification
    {
        $userNotification = new UserNotification();
        $userNotification->setUser($user);
        $userNotification->setNotification($notification);
        $this->userNotificationRepository->save($userNotification, true);
        $this->logger->info('Adding notification to user '.$user->getId());
        $this->publishNotification($user, $notification);
        return $userNotification;
    }

    public function addNotificationToUsers(array $users, $notification): array
    {
        $userNotifications = [];
        foreach($users as $user){
            $userNotifications[] = $this->addNotificationToUser($user, $notification);
        }
        return $userNotifications;
    }


    /**
     *  not the optimal way to do it but it works
     *  make the concerne property of a notification with a value '*' to send the notification to all users
     */
    public function addNotificationToAllUsers(Notification $notification): array
    {
        $users = $this->userRepository->findAll();
        return $this->addNotificationToUsers($users, $notification);
    }

    public function updateNotificationAccessibility(Notification $notification): Notification
    {
        $this->notificationRepository->update($notification, true);
        return $notification;
    }

    public function deleteNotification(Notification $notification): void
    {
        $this->notificationRepository->delete($notification, true);
    }

    public function deleteNotificationById(int $id): void
    {
        $notification = $this->getNotificationById($id);
        if($notification){
            $this->deleteNotification($notification);
        }else{
            throw new HttpException(404, 'Notification not found');
        }
    }

    public function deleteNotificationFromUser(User $user, Notification $notification): void
    {
        $userNotification = $this->userNotificationRepository->findOneBy(['user' => $user, 'notification' => $notification]);
        if($userNotification){
            $this->userNotificationRepository->delete($userNotification, true);
        }else{
            throw new HttpException(404, 'Notification not found');
        }
    }

    public function updateNotification($notification, $contenu): Notification
    {
        $notification->setContenu($contenu);
        $this->notificationRepository->update($notification, true);
        return $notification;
    }

    public function getNotificationsByUser(User $user, $page=null, $limit=null): array
    {
        if(is_null($page) || is_null($limit)){
            return $this->userNotificationRepository->findBy(['user' => $user], ['notification' => 'DESC'], 50);
        }
        return $this->userNotificationRepository->findBy(['user' => $user], null, $limit, ($page-1)*$limit);
    }

    public function getUnreadNotificationsByUser(User $user): array
    {
        return $this->userNotificationRepository->findBy(['user' => $user, 'isRead' => false]);

       
    }

    public function getUnreadNotificationsCountByUser(User $user): int
    {
        return count($this->getUnreadNotificationsByUser($user));
    }

    public function getReadNotificationsByUser(User $user): array
    {
        return $this->userNotificationRepository->findBy(['user' => $user, 'isRead' => true]);
    }

    public function getReadNotificationsCountByUser(User $user): int
    {
        return count($this->getReadNotificationsByUser($user));
    }

    public function getUsersByNotification(Notification $notification): array
    {
        return $this->userNotificationRepository->findBy(['notification' => $notification]);
    }

    public function getNotificationById(int $id): ?Notification
    {
        return $this->notificationRepository->find($id);
    }
    
    public function getNotificationsByPagination($page, $rows, $user=null){
        if(is_null($user)){
            return $this->notificationRepository->getNotificationsByPagination($page, $rows);
        }else{
            return $this->notificationRepository->getNotificationsByPaginationAndUser($page, $rows, $user);
        }
    }
    /**
     * Notifications that are created after the given date
    */
    public function getUnreadNotificationsByUserFromDate(User $user, \DateTime $date): array
    {
        
        $q = $this->entityManager->createQuery(
            'SELECT n FROM App\Entity\Notification n
            JOIN App\Entity\UserNotification un
            WHERE un.user = :user
            AND n.date > :date
            AND un.notification = n.id
            AND un.isRead = false
            ORDER BY n.date DESC'
        );
        $q->setParameter('user', $user);
        $q->setParameter('date', $date);
        return $q->getResult();
    }
    
    public function readNotification($userid, $notificationid)
    {
        $userNotification = $this->userNotificationRepository->findOneBy(['user' => $userid, 'notification' => $notificationid]);
        if($userNotification){
            $this->userNotificationRepository->updateRead($userNotification, true);
        }else{
            throw new HttpException(404, 'Notification not found');
        }
        return ([
            'status' => 'success',
            'message' => 'Notification read successfully'
        ]);
    }

    public function readNotifications($userid, $notifications){
        foreach($notifications as $notification){
            $this->readNotification($userid, $notification);
        }
        return ([
            'status' => 'success',
            'message' => 'Notifications read successfully'
        ]);
    }

    public function getAllNotifications(): array
    {
        return $this->notificationRepository->findAll();
    }

 
    public function readAllNotifications(User $user): void
    {
        $notifications = $this->getUnreadNotificationsByUser($user);
        if(count($notifications) > 0){
            $this->readNotifications($user, $notifications);
        }
    }

}


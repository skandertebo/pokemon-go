<?php
namespace App\Service;

use App\Entity\Notification;
use App\Entity\User;
use App\Entity\UserNotification;
use App\Repository\NotificationRepository;
use App\Repository\UserNotificationRepository;
use App\Repository\UserRepository;
use App\UtilityClasses\Observable;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Doctrine\ORM\EntityManagerInterface;
class NotificationService {
    public function __construct(
        private NotificationRepository $notificationRepository,
        private UserNotificationRepository $userNotificationRepository,
        private EntityManagerInterface $entityManager,
        private UserRepository $userRepository,
    ){}

    public function createNotification(Notification $notification): Notification
    {
        $this->notificationRepository->save($notification, true);
        return $notification;
    }
    public function addNotificationToUser(User $user, Notification $notification): UserNotification
    {
        $userNotification = new UserNotification();
        $userNotification->setUser($user);
        $userNotification->setNotification($notification);
        $this->userNotificationRepository->save($userNotification, true);
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

    public function getNotificationsByUser(User $user): array
    {
        return $this->userNotificationRepository->findBy(['user' => $user]);
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
    
    public function readNotification(User $user, Notification $notification): void
    {
        $userNotification = $this->userNotificationRepository->findOneBy(['user' => $user, 'notification' => $notification]);
        if($userNotification){
            $this->userNotificationRepository->updateRead($userNotification, true);
        }else{
            throw new HttpException(404, 'Notification not found');
        }
    }

    public function getAllNotifications(): array
    {
        return $this->notificationRepository->findAll();
    }
}


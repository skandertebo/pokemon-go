<?php

namespace App\Controller;

use App\Entity\Notification;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\NotificationService;
use App\Service\UserService;
use Doctrine\ORM\EntityManager;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Post;
use Psr\Log\LoggerInterface;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\PublisherInterface;
use Symfony\Component\Mercure\Update;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use function App\createErrorResponse;

class NotificationController extends AbstractController
{

    public function __construct(
        private NotificationService $notificationService,
        private UserService $userService
    ){}


    // getAllByPaginationd
    /**
     * @Security("is_granted('ROLE_ADMIN')")
     */
    #[Get('/notification')]
    public function getAllByPagination(Request $req): JsonResponse
    {   
        $notifications = null;
        $page = $req->query->get('page');
        $rows = $req->query->get('rows');
        if(is_null($page) || is_null($rows)){
            $notifications = $this->notificationService->getAllNotifications();

        }
        else{
            $notifications = $this->notificationService->getNotificationsByPagination($page, $rows);
  
        }
        return new JsonResponse($notifications, Response::HTTP_OK);
    }
    /**
     * @Security("is_granted('ROLE_USER')")
    */
    #[Get('/notification/user/{id}')]
    public function getAllByUser(Request $req, int $id): JsonResponse
    {
        $user = $this->userService->find($id);
        $this->verifyUserAuthorization($req, $id);
        if(is_null($user)){
            $resp = createErrorResponse('User not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $notifications = $this->notificationService->getNotificationsByUser($user, $req->query->get('page'), $req->query->get('rows'));
        return new JsonResponse($notifications, Response::HTTP_OK);
    }

    /**
     * @Security("is_granted('ROLE_USER')")
    */
    #[Get('/notification/{id}')]
    public function getOneById(int $id): JsonResponse
    {
        $notification = $this->notificationService->getNotificationById($id);
        return new JsonResponse($notification, Response::HTTP_OK);
    }

    /**
     * @Security("is_granted('ROLE_USER')")
    */
    #[Get('/notification/user/unread/count')]
    public function getUnreadNotificationsCount(Request $req, int $userid): JsonResponse
    {
        $user = $this->userService->find($userid);
        if(is_null($user)){
            $resp = createErrorResponse('User not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $count = $this->notificationService->getUnreadNotificationsCountByUser($user);
        return new JsonResponse($count, Response::HTTP_OK);
    }

    /**
     * @Security("is_granted('ROLE_USER')")
    */
    #[Get('/notification/user/unread')]
    public function getUnreadNotifications(Request $req, int $userid): JsonResponse
    {
        $user = $this->userService->find($userid);
        if(is_null($user)){
            $resp = createErrorResponse('User not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $notifications = $this->notificationService->getUnreadNotificationsByUser($user);
        return new JsonResponse($notifications, Response::HTTP_OK);
    }

    /**
     * @Security("is_granted('ROLE_USER')")
    */
    #[Get('/notification/user/read')]
    public function getReadNotifications(Request $req, int $userid): JsonResponse
    {
        $user = $this->userService->find($userid);
        if(is_null($user)){
            $resp = createErrorResponse('User not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $notifications = $this->notificationService->getReadNotificationsByUser($user);
        return new JsonResponse($notifications, Response::HTTP_OK);
    }

    /**
     * @Security("is_granted('ROLE_USER')")
    */
    #[Get('/notification/user/read/count')]
    public function getReadNotificationsCount(Request $req, int $userid): JsonResponse
    {
        $user = $this->userService->find($userid);
        if(is_null($user)){
            $resp = createErrorResponse('User not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $count = $this->notificationService->getReadNotificationsCountByUser($user);
        return new JsonResponse($count, Response::HTTP_OK);
    }

    /**
     * @Security("is_granted('ROLE_USER')")
    */
    #[Get('/notification/user/unread/fromDate')]
    public function getNotificationsFromDate(Request $req, int $userid): JsonResponse
    {
        $datetimestamp = $req->query->get('date'); // timestamp
        $user = $this->userService->find($userid);
        if(is_null($user)){
            $resp = createErrorResponse('User not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        // ensure $date is a valid timestamp
        if(!is_numeric($datetimestamp)){
            $resp = createErrorResponse('Invalid date', Response::HTTP_BAD_REQUEST);
            return $resp;
        }
        // create a date object from timestamp
        $date = new \DateTime();
        $date->setTimestamp($datetimestamp);

        $notifications = $this->notificationService->getUnreadNotificationsByUserFromDate($user, $date);
        return new JsonResponse($notifications, Response::HTTP_OK);
    }

    /**
     * @Security("is_granted('ROLE_ADMIN')")
     */
    #[Post('/notification')]
    public function create(Request $req): JsonResponse
    {
        $data = json_decode($req->getContent(), true);
        if(is_null($data['notification'])){
            $resp = createErrorResponse('Notification not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        if(is_null($data['notification']['contenu'])){
            $resp = createErrorResponse('Contenu not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $receivedNotification = new Notification();
        $receivedNotification->setContenu($data['notification']['contenu']);
        $notification = $this->notificationService->createNotification($receivedNotification);
        if(!isset($data['users']))
            $this->notificationService->addNotificationToAllUsers($notification);
        else
            $this->notificationService->addNotificationToUsers($data['users'], $notification);

        return new JsonResponse($notification, Response::HTTP_CREATED);
    }

    /**
     * @Security("is_granted('ROLE_USER')")
    */
    #[Post('/notification/read')]
    public function markAsRead(Request $req): JsonResponse
    {
        $data = json_decode($req->getContent(), true);
        $user = $data['user'];
        if(is_null($user)){
            $resp = createErrorResponse('User not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $notification = $data['notification'];
        if(is_null($notification)){
            $resp = createErrorResponse('Notification not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $this->notificationService->readNotification($notification, $user);
        return new JsonResponse(null, Response::HTTP_OK);
    }

    /**
     * @Security("is_granted('ROLE_ADMIN')")
     */
    #[Delete('/notification/{id}')]
    public function delete(int $id): JsonResponse
    {
        $notification = $this->notificationService->getNotificationById($id);
        if(is_null($notification)){
            $resp = createErrorResponse('Notification not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $this->notificationService->deleteNotification($notification);
        return new JsonResponse(null, Response::HTTP_OK);
    }

    private function verifyUserAuthorization(Request $req, int $targetUserId){
        $authenticatedUserId = $req->attributes->get('jwt_payload')['id'];
        $authenticatedUser = $this->userService->find($authenticatedUserId);
        if(!in_array('ROLE_ADMIN', $authenticatedUser->getRoles())){
            if($targetUserId !== $authenticatedUserId){
                $resp = createErrorResponse('Unauthorized', Response::HTTP_UNAUTHORIZED);
                return $resp;
            }
        }
        return true;
    }

}

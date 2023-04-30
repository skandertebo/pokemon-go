<?php

namespace App\Controller;

use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\NotificationService;
use App\Service\UserService;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Post;

use function App\createErrorResponse;

class NotificationController extends AbstractController
{

    public function __construct(
        private NotificationService $notificationService,
        private UserService $userService
    ){}


    /**
     * @Route("/api", name="notifications", methods={"GET", "POST", "DELETE"})
     */
    // getAllByPaginationd
    #[Get('/notifications')]
    public function getAllByPagination(Request $req): JsonResponse
    {   
        $notifications = null;
        $userid = $req->query->get('user');
        $page = $req->query->get('page');
        $rows = $req->query->get('rows');
        if(is_null($page) || is_null($rows)){
            if(is_null($userid)){
                $notifications = $this->notificationService->getAllNotifications();
            }else{
                $user = $this->userService->find($userid);
                $notifications = $this->notificationService->getNotificationsByUser($user);
            }
        }
        else{
            if(is_null($userid)){
                $notifications = $this->notificationService->getNotificationsByPagination($page, $rows);
            }else{
                $user = $this->userService->find($userid);
                $notifications = $this->notificationService->getNotificationsByPagination($page, $rows, $user);
            }
        }
        return new JsonResponse($notifications, Response::HTTP_OK);
    }


    #[Get('/notifications/{id}')]
    public function getOneById(int $id): JsonResponse
    {
        $notification = $this->notificationService->getNotificationById($id);
        return new JsonResponse($notification, Response::HTTP_OK);
    }

    #[Get('/notifications/unread/count')]
    public function getUnreadNotificationsCount(Request $req): JsonResponse
    {
        $userid = $req->query->get('user');
        $user = $this->userService->find($userid);
        if(is_null($user)){
            $resp = createErrorResponse('User not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $count = $this->notificationService->getUnreadNotificationsCountByUser($user);
        return new JsonResponse($count, Response::HTTP_OK);
    }

    #[Get('/notifications/unread')]
    public function getUnreadNotifications(Request $req): JsonResponse
    {
        $userid = $req->query->get('user');
        $user = $this->userService->find($userid);
        if(is_null($user)){
            $resp = createErrorResponse('User not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $notifications = $this->notificationService->getUnreadNotificationsByUser($user);
        return new JsonResponse($notifications, Response::HTTP_OK);
    }

    #[Get('/notifications/read')]
    public function getReadNotifications(Request $req): JsonResponse
    {
        $userid = $req->query->get('user');
        $user = $this->userService->find($userid);
        if(is_null($user)){
            $resp = createErrorResponse('User not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $notifications = $this->notificationService->getReadNotificationsByUser($user);
        return new JsonResponse($notifications, Response::HTTP_OK);
    }

    #[Get('/notifications/read/count')]
    public function getReadNotificationsCount(Request $req): JsonResponse
    {
        $userid = $req->query->get('user');
        $user = $this->userService->find($userid);
        if(is_null($user)){
            $resp = createErrorResponse('User not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $count = $this->notificationService->getReadNotificationsCountByUser($user);
        return new JsonResponse($count, Response::HTTP_OK);
    }

    #[Get('/notifications/unread/fromDate')]
    public function getNotificationsFromDate(Request $req): JsonResponse
    {
        $userid = $req->query->get('user');
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

    #[Post('/notifications')]
    public function create(Request $req): JsonResponse
    {
        $data = json_decode($req->getContent(), true);
        $notification = $this->notificationService->createNotification($data['notification']);
        if(is_null($data['users']))
            $this->notificationService->addNotificationToAllUsers($notification);
        else
            $this->notificationService->addNotificationToUsers($data['users'], $notification);

        return new JsonResponse($notification, Response::HTTP_CREATED);
    }

    #[Post('/notifications/read')]
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

    #[Delete('/notifications/{id}')]
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


}

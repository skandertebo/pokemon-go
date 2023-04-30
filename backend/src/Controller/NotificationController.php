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

class NotificationController extends AbstractController
{

    public function __construct(
        private NotificationService $notificationService,
        private UserService $userService
    ){}



    // getAllByPaginationd
    #[Get('/notifications')]
    public function getAllByPagination(Request $req): JsonResponse
    {   
        $notifications = null;
        $userid = $req->query->get('user');
        $page = $req->query->get('page');
        $rows = $req->query->get('rows');
        $user = $this->userService->findById($userid);
        if(is_null($page) || is_null($rows)){
            if(is_null($user)){
                $notifications = $this->notificationService->getAllNotifications();
            }else{
                $notifications = $this->notificationService->getNotificationsByUser($user);
            }
        }
        else{
            if(is_null($user)){
                $notifications = $this->notificationService->getNotificationsByPagination($page, $rows);
            }else{
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

    #[Get('/notifications/count')]
    public function getUnreadNotificationsCount(Request $req): JsonResponse
    {
        $user = $req->query->get('user');
        if(is_null($user)){
            $resp = createErrorResponse('User not found', Response::HTTP_NOT_FOUND);
            return $resp;
        }
        $count = $this->notificationService->getUnreadNotificationsCountByUser($user);
        return new JsonResponse($count, Response::HTTP_OK);
    }
}

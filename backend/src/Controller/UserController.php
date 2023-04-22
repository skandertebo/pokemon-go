<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\UserService;
class UserController extends AbstractController
{

  public function __construct(private UserService $userService)
    {
    }

 

    #[Route('/user', name: 'app_user')]
    public function index(): Response
    {
       
    }
}

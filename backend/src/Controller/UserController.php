<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\UserService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use App\Entity\User;
use App\Entity\Admin;
use App\Entity\Player;
use App\Functions\CreateValidationErrorResponse ;

/**
 * @Route("/api", name="api_")
 */
  
class UserController extends AbstractController 
{

  public function __construct(private UserService $userService)
    {
    }

    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(Request $request,JWTTokenManagerInterface $jwtManagerInt)
    {
        $data = json_decode($request->getContent(), true);

       
        try {
            $user = $this->userService->createUser($data);
             $token = $jwtManagerInt->create($user);
            return new JsonResponse([
                'email' => $user->getEmail(),
                'message' => 'Registered Successfully',
                'token' => $token
                
            ]);
        } catch (\InvalidArgumentException $e) {
            return createValidationErrorResponse($e);
        }
       

       
      }



 /**
 * @Route("/login", name="login", methods={"POST"})
 */
   public  function login(Request $request, JWTTokenManagerInterface $jwtManagerInt)
   {
    $data = json_decode($request->getContent(), true);
    $user=$this->userService->checkUserLogin($data); 

    
    try{
        return new JsonResponse([
            // 'id' => $user->getId(),
            'email' => $user->getEmail(),
            'message' => 'Logged in Successfully',
            'token' => $token
        ]);}
    catch (\InvalidArgumentException $e) {
                return createValidationErrorResponse($e);
            }
     }


       


 /**
 * @Route("/user", name="getUsers", methods={"GET"})
 */
     public function getUsers()
     {
        $users= $this->userService->findAll(); 
        return new JsonResponse($users);

     }
    }



 

   
  

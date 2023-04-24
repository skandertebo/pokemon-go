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
       

        // Generate a JWT token and return it to the client
       
       

       
    }

 

   
}

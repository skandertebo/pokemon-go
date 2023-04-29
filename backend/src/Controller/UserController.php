<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\UserService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\User;
use App\Entity\Admin;
use App\Entity\Player;
use App\Functions\CreateValidationErrorResponse ;
use App\Functions\CreateErrorResponse ;
use App\DTO\AddUserDTO;
use Psr\Log\LoggerInterface;


use function App\createErrorResponse;

/**
 * @Route("/api", name="api_")
 */

class UserController extends AbstractController
{

  public function __construct(private UserService $userService,private ValidatorInterface $validator,  private LoggerInterface $logger)
    {
    }

    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $userDTO = new AddUserDTO($data); 
        
         $errors = $this->validator->validate($userDTO, null, $userDTO->getGroupSequence());

        if (count($errors) > 0) {
            return createValidationErrorResponse($errors); }
        try {
            [$user, $token] = $this->userService->createUser($data);
            return new JsonResponse([
                'user' => $user,
                'message' => 'Registered Successfully',
                'token' => $token

            ]);
        } catch (\InvalidArgumentException $e) {
            return createErrorResponse($e->getMessage(), 422);
        }
    }




    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public  function login(Request $request)
    {
        $data = json_decode($request->getContent(), true);

    $userDTO = new AddUserDTO($data); 
    $errors = $this->validator->validate($userDTO, null, $userDTO->getGroupSequence());

    if (count($errors) > 0) {
         return createValidationErrorResponse($errors); }
        
    try{
        [$user,$token]=$this->userService->checkUserLogin($data);
        
        
            
        return new JsonResponse([
            'user' => $user,
            'message' => 'Logged in Successfully',
            'token' => $token
        ]);}
    catch (\InvalidArgumentException $e) {
            return createErrorResponse($e->getMessage(), 400);
        }
    }





    /**
     * @Route("/user", name="getUsers", methods={"GET"})
     */
    public function getUsers()
    {
        $users = $this->userService->findAll();
        return new JsonResponse($users);
    }




    /**
     * @Route("/user/{id}", name="getUser", methods={"GET"})
     */
    public function getUserRedefned(Request $request, $id)
    {
        $id = intval($id);
        try {
            $user = $this->userService->find($id);
            return new JsonResponse($user);
        } catch (\InvalidArgumentException $e) {
            return createErrorResponse($e->getMessage(), 400);
        }
    }



    /**
     * @Route("/user/delete/{id}", name="deleteUser", methods={"DELETE"})
     */
    public function deleteUser(Request $request, $id)
    {
        $id = intval($id);
        try {
            $this->userService->deleteUser($id, true);
            return new JsonResponse(['status' => 'User deleted']);
        } catch (\InvalidArgumentException $e) {
            return createErrorResponse($e->getMessage(), 400);
        }
    }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use App\Entity\User;
use App\Entity\Admin;
use App\Entity\Player;

class RegistrationController extends AbstractController
{
    /**
     * @Route("api/register", name="register", methods={"POST"})
     */
    public function register(ManagerRegistry $doctrine,Request $request,JWTTokenManagerInterface $jwtManagerInt, UserPasswordHasherInterface $passwordHasher, ValidatorInterface $validator)
    {
        $data = json_decode($request->getContent(), true);

        $role = $data['role'];
        $email = $data['email'];
        $password = $data['password'];

        // Create a new user based on the user type
        switch ($role) {
            case 'admin':
                $user = new Admin();
                $user->setRoles(['ROLE_ADMIN']);
                break;
            case 'player':
                $user = new Player();
                $playerTag = $data['playerTag'];
                $user->setPlayerTag($playerTag);
                $user->setScore(0);
                $user->setRoles(['ROLE_USER']);
                break;
            default:
                return new JsonResponse(['error' => 'Invalid user type'], 400);
        }

        $user->setEmail($email);
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $password
        );
        $user->setPassword($hashedPassword);
        // Validate the user entity
        $errors = $validator->validate($user);

        if (count($errors) > 0) {
            return new JsonResponse(['error' => (string) $errors], 400);
        }

        // Persist the user entity to the database
        $entityManager = $doctrine->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        // Generate a JWT token and return it to the client
       
        $token = $jwtManagerInt->create($user);

        return new JsonResponse(['message' => 'Registered Successfully','token' => $token]);
    }
}

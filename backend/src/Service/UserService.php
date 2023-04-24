<?php 

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Psr\Log\LoggerInterface;

use App\Entity\Admin;
use App\Entity\Player;

class UserService
{
    

    public function __construct(private UserRepository $userRepository, private ValidatorInterface $validator , private UserPasswordHasherInterface $passwordHasher, private LoggerInterface $logger)
    {
    }



     public function createUser(array $data): User
    {
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
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $password
        );
        $user->setPassword($hashedPassword);
        // Validate the user entity
        $errors = $this->validator->validate($user);

        if (count($errors) > 0) {
            return new JsonResponse(['error' => (string) $errors], 400);
        }


         $user=$this->userRepository->save($user,true);
        $this->logger->debug('hello',['userid'=>$user->getId()]);

         return $user; 

        
    }


    public function remove(User $user, bool $flush = false): void
    {
        $userRepository->remove($user, $flush);
    }



    public function findOneBySomeField($value): ?User
    {
        return $userRepository->findOneBySomeField($value);
    }

    public function findAll(): array
    {
        return $userRepository->findAll();
    }
    


    public function findByExampleField($value): array
    {
        return $userRepository->findByExampleField($value);
    }




}


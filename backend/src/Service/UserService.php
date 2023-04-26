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
                $this->logger->debug('hello',['id'=>$user->getId()]);
                $playerTag = $data['playerTag'];
                $user->setPlayerTag($playerTag);
                $user->setScore(0);
                $user->setRoles(['ROLE_USER']);
                break;
            default:
                 throw new \InvalidArgumentException('role column should be admin or player');
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
             throw new \InvalidArgumentException('Validation error');
        }


         $user=$this->userRepository->save($user,true);


         return $user; 

        
    }



    public function getUserByEmail(string $email): ?User
{
    return $this->userRepository->findOneBy(['email' => $email]);
}




public function checkUserLogin(array $data):User{

    $email = $data['email'];
    $password = $data['password'];

    $user = $this->getUserByEmail($email);

    if ($user===null ) {
         throw new \InvalidArgumentException('a User with these credentials does not exist ');
    }

    if (!$this->passwordHasher->isPasswordValid($user, $password)) {
         throw new \InvalidArgumentException('wrong password');
    }
return $user;
    
}


   
    public function remove(User $user, bool $flush = false): void
    {
        $this->userRepository->remove($user, $flush);
    }



    public function findOneBySomeField($value): ?User
    {
        return $this->userRepository->findOneBySomeField($value);
    }

    public function findAll(): array
    {
        return $this->userRepository->findAll();
    }
    


    public function findByExampleField($value): array
    {
        return $this->userRepository->findByExampleField($value);
    }




}


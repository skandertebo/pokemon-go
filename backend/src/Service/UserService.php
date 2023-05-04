<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\PlayerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Psr\Log\LoggerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

use App\Entity\Admin;
use App\Entity\Player;

class UserService
{

    public function __construct(private UserRepository $userRepository, private PlayerRepository $playerRepository, private UserPasswordHasherInterface $passwordHasher, private LoggerInterface $logger, private JWTTokenManagerInterface $jwtManagerInt)
    {
    }

    public function getUserByEmail(string $email): ?User
    {
        return $this->userRepository->findOneBy(['email' => $email]);
    }

    public function createUser(array $data): array
    {
        $role = $data['role'];
        $email = $data['email'];
        if ($this->getUserByEmail($email)) {
            throw new \InvalidArgumentException('User email already exists');
        }
        $password = $data['password'];

        // Create a new user based on the user type
        switch ($role) {
            case 'admin':
                $user = new Admin();
                $user->setRoles(['ROLE_ADMIN','IS_AUTHENTICATED_FULLY']);
                break;
            case 'player':
                $user = new Player();
                $playerTag = $data['playerTag'];
                if ($this->playerRepository->findOneBy(['playerTag' => $playerTag])) {
                    throw new \InvalidArgumentException('Player tag already exists');
                };

                $user->setPlayerTag($playerTag);
                $user->setScore(0);
                $user->setRoles(['ROLE_USER','IS_AUTHENTICATED_FULLY']);
                $image = $data['image'];
                $user->setImage($image);
                break;
            default:
                throw new \InvalidArgumentException('Invalid user role');
        }

        $user->setEmail($email);
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $password
        );
        $user->setPassword($hashedPassword);



        
        $user = $this->userRepository->save($user, true);
        $token = $this->jwtManagerInt->create($user);

        $array = [$user, $token];


        return $array;
    }


    public function updateUser(int $id, array $data): User
    {
        $user = $this->userRepository->find($id);
        if (!$user) {
            throw new \InvalidArgumentException('User does not exist');
        }

        if (isset($data['email'])) {
            $email = $data['email'];
            if ($this->getUserByEmail($email)) {
                throw new \InvalidArgumentException('User email already exists');
            }
            $user->setEmail($email);
            $this->userRepository->save($user);
        }
        
        if (isset($data['password']))
        {
            $password = $data['password'];
            $hashedPassword = $this->passwordHasher->hashPassword(
                $user,
                $password
            );
            $this->userRepository->upgradePassword($user, $hashedPassword);
        }

        
        

        return $user;
    }





    public function checkUserLogin(array $data): array
    {

        $email = $data['email'];
        $password = $data['password'];

        $user = $this->getUserByEmail($email);
        $hashedPassword = $this->passwordHasher->hashPassword(
                $user,
                $password
            );
        if ($hashedPassword !== $user->getPassword()) {
            throw new \InvalidArgumentException('wrong password ');
        }
        

        if ($user === null) {
            throw new \InvalidArgumentException('a User with these credentials does not exist ');
        }
        $token = $this->jwtManagerInt->create($user);
        $array = [$user, $token];
        return $array;
    }



    public function deleteUser(int $id, bool $flush = false): void
    {
        $user = $this->userRepository->find($id);
        if (!$user) {
            throw new \InvalidArgumentException('User does not exist');
        }

        $this->userRepository->remove($user, $flush);
    }



    // public function findOneBySomeField($value): ?User
    // {
    //     return $userRepository->findOneBySomeField($value);
    // }

    public function findAll(): array
    {
        return $this->userRepository->findAll();
    }

    public function find(int $id): ?User
    {
        $user = $this->userRepository->find($id);
        if (!$user) {
            throw new \InvalidArgumentException('User does not exist');
        }
        return $user;
    }

    // public function findByExampleField($value): array
    // {
    //     return $userRepository->findByExampleField($value);
    // }




}

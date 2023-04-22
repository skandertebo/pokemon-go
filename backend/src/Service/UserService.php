<?php 

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;


class UserService
{
    

    public function __construct(private UserRepository $userRepository)
    {
    }


    public function save(User $user, bool $flush = false): void
    {
        $this->userRepository->save($user, $flush);
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


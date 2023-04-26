<?php

namespace App\Entity;

use App\Repository\AdminRepository;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

#[ORM\Entity(repositoryClass: AdminRepository::class)]
class Admin extends User implements JsonSerializable
{
  
    public function jsonSerialize():array
    {
        return [
            'id' => $this->getId(),
            'email' => $this->getEmail(),
        ];
    }
}

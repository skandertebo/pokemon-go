<?php

namespace App\Entity;

use App\Repository\AdminRepository;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

#[ORM\Entity(repositoryClass: AdminRepository::class)]
class Admin extends User implements JsonSerializable
{
    #[ORM\Id]
    #[ORM\OneToOne(targetEntity:'User')]
    #[ORM\JoinColumn(name: 'id', referencedColumnName: 'id')]
    private ?int $id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'email' => $this->getEmail(),
        ];
    }
}

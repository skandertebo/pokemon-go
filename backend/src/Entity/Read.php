<?php

namespace App\Entity;

use App\Repository\ReadRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReadRepository::class)]
class Read
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $read = null;

    #[ORM\ManyToOne(targetEntity: Player::class, inversedBy: "reads")]
    #[ORM\JoinColumn(nullable: false)]
    private $player;

    #[ORM\ManyToOne(targetEntity: Notification::class, inversedBy: "reads")]
    #[ORM\JoinColumn(nullable: false)]
    private $notification;
    

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isRead(): ?bool
    {
        return $this->read;
    }

    public function setRead(bool $read): self
    {
        $this->read = $read;

        return $this;
    }
}

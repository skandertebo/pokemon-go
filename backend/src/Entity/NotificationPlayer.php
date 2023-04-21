<?php

namespace App\Entity;

use App\Repository\NotificationPlayerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NotificationPlayerRepository::class)]
class NotificationPlayer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'notifications')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Player $playerId = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Notification $notificationId = null;

    #[ORM\Column(type: 'boolean')]
    private bool $isRead = false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayerId(): ?Player
    {
        return $this->playerId;
    }

    public function setPlayerId(?Player $playerId): self
    {
        $this->playerId = $playerId;

        return $this;
    }

    public function getNotificationId(): ?Notification
    {
        return $this->notificationId;
    }

    public function setNotificationId(?Notification $notificationId): self
    {
        $this->notificationId = $notificationId;

        return $this;
    }

    public function getIsRead(): bool
    {
        return $this->isRead;
    }

    public function setIsRead(bool $isRead): self
    {
        $this->isRead = $isRead;

        return $this;
    }
}

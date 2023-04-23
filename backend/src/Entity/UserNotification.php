<?php

namespace App\Entity;

use App\Repository\UserNotificationRepository;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

#[ORM\Entity(repositoryClass: UserNotificationRepository::class)]
class UserNotification implements JsonSerializable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable:false)]
    private ?bool $isRead = false;

    #[ORM\ManyToOne(inversedBy: 'userNotifications')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private ?Notification $notification= null;

    #[ORM\ManyToOne(inversedBy: 'userNotifications')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isIsRead(): ?bool
    {
        return $this->isRead;
    }

    public function setIsRead(bool $isRead): self
    {
        $this->isRead = $isRead;

        return $this;
    }

    public function getNotification(): ?Notification
    {
        return $this->notification;
    }

    public function setNotification(?Notification $notification): self
    {
        $this->notification = $notification;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'isRead' => $this->isRead,
            'notification' => $this->notification,
            'user' => $this->user,
        ];
    }
}

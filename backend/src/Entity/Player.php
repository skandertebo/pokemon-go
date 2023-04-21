<?php

namespace App\Entity;

use App\Repository\PlayerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\Collection;

#[ORM\Entity(repositoryClass: PlayerRepository::class)]

class Player extends User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;


    #[ORM\Column(length: 255)]
    private ?string $playerTag = null;

    #[ORM\Column]
    private ?int $score = null;

    /* *** */
    #[ORM\OneToMany(targetEntity: Capture::class, mappedBy: "spawn", orphanRemoval: true)]
    private $captures;

    #[ORM\OneToMany(mappedBy: 'playerId', targetEntity: NotificationPlayer::class, orphanRemoval: true)]
    private \Doctrine\Common\Collections\Collection $notifications;

    public function __construct()
    {
        //$this->posts = new ArrayCollection();
        $this->notifications = new ArrayCollection();
    }

    public function getNotifications(): ArrayCollection
    {
        return $this->notifications;
    }

    public function addNotification(Notification $notification): self
    {
        if (!$this->notifications->contains($notification)) {
            $this->notifications[] = $notification;
        }

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayerTag(): ?string
    {
        return $this->playerTag;
    }

    public function setPlayerTag(string $playerTag): self
    {
        $this->playerTag = $playerTag;

        return $this;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function setScore(int $score): self
    {
        $this->score = $score;

        return $this;
    }

    public function getCaptures(): ArrayCollection
    {
        return $this->captures;
    }

    public function addCapture(Capture $capture): self
    {
        if (!$this->captures->contains($capture)) {
            $this->captures[] = $capture;
            $capture->setPlayer($this);
        }

        return $this;
    }


}

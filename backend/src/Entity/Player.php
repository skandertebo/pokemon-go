<?php

namespace App\Entity;

use App\Repository\PlayerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlayerRepository::class)]

class Player extends User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToMany(targetEntity: Notification::class, mappedBy: 'notifications')]
    private $notifications;

    #[ORM\OneToMany(targetEntity: Spawn::class, mappedBy: 'spawns')]
    private $spawns;

    #[ORM\Column(length: 255)]
    private ?string $playerTag = null;

    #[ORM\Column]
    private ?int $score = null;

    /* *** */
    #[ORM\OneToMany(targetEntity: Capture::class, mappedBy: "spawn", orphanRemoval: true)]
    private $captures;

    public function __construct()
    {
        $this->posts = new ArrayCollection();
    }

    public function getNotifications(): Collection
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

    public function getSpawns(): Collection
    {
        return $this->spawns;
    }

    public function addSpawn(Spawn $spawn): self
    {
        if (!$this->spawns->contains($spawn)) {
            $this->spawns[] = $spawn;
            $spawn->setPlayer($this);
            //add capture
            $capture = new Capture();
            $capture->setPlayer($this);
            $capture->setSpawn($spawn);
            $capture->setDate(new \DateTime());
            $this->addCapture($capture);
            //set score
            $this->setScore($this->getScore() + $spawn->getPokemon()->getBaseScore());
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

    public function getCaptures(): Collection
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

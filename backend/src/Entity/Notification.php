<?php

namespace App\Entity;

use App\Repository\NotificationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

//might be useful to add a type on the notification entity if there are multiple types of notification
#[ORM\Entity(repositoryClass: NotificationRepository::class)]
class Notification implements JsonSerializable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $contenu = null;
    
    #[ORM\Column(type: 'datetime')]
    private ?\DateTimeInterface $date = null;

    // for reasons of optimization we could make the notification concern all users or only a specific group of users that share a property without having to make many UserNotification entities
    // value '*' means all users
    #[ORM\Column(length:10)]
    private ?string $concerne = null;
    

    #[ORM\OneToMany(mappedBy: 'userId', targetEntity: UserNotification::class, orphanRemoval: true)]
    private Collection $userNotifications;

    public function __construct()
    {
        $this->userNotifications = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContenu(): ?string
    {
        return $this->contenu;
    }

    public function setContenu(string $contenu): self
    {
        $this->contenu = $contenu;

        return $this;
    }


    
    /**
     * @return Collection<int, UserNotification>
     */
    public function getUserNotifications(): Collection
    {
        return $this->userNotifications;
    }

    public function addUserNotification(UserNotification $userNotification): self
    {
        if (!$this->userNotifications->contains($userNotification)) {
            $this->userNotifications->add($userNotification);
            $userNotification->setNotification($this);
        }

        return $this;
    }

    public function removeUserNotification(UserNotification $userNotification): self
    {
        if ($this->userNotifications->removeElement($userNotification)) {
            // set the owning side to null (unless already changed)
            if ($userNotification->getNotification() === $this) {
                $userNotification->setNotification(null);
            }
        }

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'contenu' => $this->getContenu(),
        ];
    }

    /**
     * Get the value of concerne
     */ 
    public function getConcerne()
    {
        return $this->concerne;
    }

    /**
     * Set the value of concerne
     *
     * @return  self
     */ 
    public function setConcerne($concerne)
    {
        $this->concerne = $concerne;

        return $this;
    }

    /**
     * Get the value of date
     */ 
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set the value of date
     *
     * @return  self
     */ 
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }
}

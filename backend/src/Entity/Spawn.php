<?php

namespace App\Entity;

use App\Repository\SpawnRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;


#[ORM\Entity(repositoryClass: SpawnRepository::class)]
class Spawn implements JsonSerializable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $latitude = null;

    #[ORM\Column]
    private ?float $longitude = null;

    #[ORM\Column]
    private ?int $radius = null;

    #[ORM\Column(type:"datetime")]
    private $spawnDate = null;

    #[ORM\ManyToOne(targetEntity: Pokemon::class, inversedBy: "spawns")]
    #[ORM\JoinColumn(nullable: false)]
    private ?Pokemon $pokemon = null;

    #[ORM\ManyToOne(inversedBy: 'spawns')]
    #[Assert\Type(type:"int")]
    private ?Player $owner=null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private $captureDate = null;


    public function __construct()
    {
        $this->spawnDate = new \DateTime();
    }
    

    public function setPokemon(?Pokemon $pokemon): self
    {
        $this->pokemon = $pokemon;

        return $this;
    }

    public function getPokemon(): ?Pokemon
    {
        return $this->pokemon;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getRadius(): ?int
    {
        return $this->radius;
    }

    public function setRadius(int $radius): self
    {
        $this->radius = $radius;

        return $this;
    }

    public function getSpawnDate()
    {
        return $this->spawnDate;
    }

    public function setSpawnDate( $spawnDate): self
    {
        $this->spawnDate = $spawnDate;

        return $this;
    }

    public function getOwner(): ?Player
    {
        return $this->owner;
    }

    public function setOwner(?Player $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'latitude' => $this->getLatitude(),
            'longitude' => $this->getLongitude(),
            'range' => $this->getRadius(),
            'spawnDate' => $this->getSpawnDate(),
            'pokemon' => $this->getPokemon(),
            'owner' => $this->getOwner(),
            'captureDate' => $this -> getCaptureDate()
        ];
    }

    public function getCaptureDate(): ?\DateTimeInterface
    {
        return $this->captureDate;
    }

    public function setCaptureDate(?\DateTimeInterface $captureDate): self
    {
        $this->captureDate = $captureDate;

        return $this;
    }
}

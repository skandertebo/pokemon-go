<?php

namespace App\Entity;

use App\Repository\SpawnRepository;
use Doctrine\DBAL\Types\Types;
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
    private ?int $range = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $spawnDate = null;

    #[ORM\ManyToOne(targetEntity: Pokemon::class, inversedBy: "spawns")]
    #[ORM\JoinColumn(nullable: false)]
    private ?Pokemon $pokemon = null;

    #[ORM\ManyToOne(inversedBy: 'spawns')]
    private ?Player $owner = null;



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

    public function getRange(): ?int
    {
        return $this->range;
    }

    public function setRange(int $range): self
    {
        $this->range = $range;

        return $this;
    }

    public function getSpawnDate(): ?\DateTimeInterface
    {
        return $this->spawnDate;
    }

    public function setSpawnDate(\DateTimeInterface $spawnDate): self
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
            'range' => $this->getRange(),
            'spawnDate' => $this->getSpawnDate(),
            'pokemon' => $this->getPokemon(),
            'owner' => $this->getOwner(),
        ];
    }
}

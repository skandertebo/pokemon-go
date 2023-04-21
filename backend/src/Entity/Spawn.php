<?php

namespace App\Entity;

use App\Repository\SpawnRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SpawnRepository::class)]
class Spawn
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

    #[ORM\OneToMany(mappedBy: 'spawn', targetEntity: Capture::class, orphanRemoval: true)]
    private $captures;

    public function __construct()
    {
        $this->captures = new ArrayCollection();
    }

    public function getCaptures(): ArrayCollection
    {
        return $this->captures;
    }
    
    public function addCapture(Capture $capture): self
    {
        if (!$this->captures->contains($capture)) {
            $this->captures[] = $capture;
            $capture->setSpawn($this);
        }

        return $this;
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
}

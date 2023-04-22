<?php

namespace App\Entity;

use App\Repository\PokemonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

#[ORM\Entity(repositoryClass: PokemonRepository::class)]
class Pokemon implements JsonSerializable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $baseScore = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column(length: 255)]
    private ?string $model3D = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'pokemon', targetEntity: Spawn::class)]
    private $spawns;
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBaseScore(): ?int
    {
        return $this->baseScore;
    }

    public function setBaseScore(int $baseScore): self
    {
        $this->baseScore = $baseScore;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getModel3D(): ?string
    {
        return $this->model3D;
    }

    public function setModel3D(string $model3D): self
    {
        $this->model3D = $model3D;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSpawns(): ArrayCollection
    {
        return $this->spawns;
    }

    public function addSpawn(Spawn $spawn): self
    {
        if (!$this->spawns->contains($spawn)) {
            $this->spawns[] = $spawn;
            $spawn->setPokemon($this);
        }

        return $this;
    }

    public function removeSpawn(Spawn $spawn): self
    {
        if ($this->spawns->removeElement($spawn)) {
            // set the owning side to null (unless already changed)
            if ($spawn->getPokemon() === $this) {
                $spawn->setPokemon(null);
            }
        }

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'baseScore' => $this->baseScore,
            'description' => $this->description,
            'image' => $this->image,
            'model3D' => $this->model3D,
            'name' => $this->name,
        ];
    }
    

}


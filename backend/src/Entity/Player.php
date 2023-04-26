<?php

namespace App\Entity;
use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\PlayerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

#[ORM\Entity(repositoryClass: PlayerRepository::class)]

class Player extends User implements JsonSerializable
{
    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank]
    #[Assert\NotNull]
    private ?string $playerTag=null;

    #[ORM\Column]
    private ?int $score = null;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Spawn::class)]
    private Collection $spawns;

    public function __construct()
    {
        parent::__construct();
        $this->spawns = new ArrayCollection();
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



    public function jsonSerialize():array
    {
        return [
            'id' => $this->getId(),
            'email' => $this->getEmail(),
            'playerTag' => $this->getPlayerTag(),
            'score' => $this->getScore(),
        ];
    }

    /**
     * @return Collection<int, Spawn>
     */
    public function getSpawns(): Collection
    {
        return $this->spawns;
    }

    public function addSpawn(Spawn $spawn): self
    {
        if (!$this->spawns->contains($spawn)) {
            $this->spawns->add($spawn);
            $spawn->setOwner($this);
        }

        return $this;
    }

    public function removeSpawn(Spawn $spawn): self
    {
        if ($this->spawns->removeElement($spawn)) {
            // set the owning side to null (unless already changed)
            if ($spawn->getOwner() === $this) {
                $spawn->setOwner(null);
            }
        }

        return $this;
    }
}

<?php

namespace App\Entity;

use App\Repository\CaptureRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CaptureRepository::class)]
class Capture
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Pokemon::class, inversedBy: "captures")]
    #[ORM\JoinColumn(nullable: false)]
    private ?Pokemon $pokemon = null;

    #[ORM\ManyToOne(targetEntity: Spawn::class, inversedBy: "captures")]
    #[ORM\JoinColumn(nullable: false)]
    private ?Spawn $spawn = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $dateCapture = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateCapture(): ?\DateTimeInterface
    {
        return $this->dateCapture;
    }

    public function setDateCapture(\DateTimeInterface $dateCapture): self
    {
        $this->dateCapture = $dateCapture;

        return $this;
    }
}

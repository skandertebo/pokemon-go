<?php

namespace App\DTO;


use Symfony\Component\Validator\Constraints as Assert;

class AddPokemonDTO {

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"int")]
    public $baseScore = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"string")]
    public $description = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"string")]
    public $image = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"string")]
    public $model3D = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"string")]
    public $name = null;

    public function __construct(array $data) {
        $this->baseScore = $data['baseScore'] ?? null;
        $this->description = $data['description'] ?? null;
        $this->image = $data['image'] ?? null;
        $this->model3D = $data['model3D'] ?? null;
        $this->name = $data['name'] ?? null;
    }
}
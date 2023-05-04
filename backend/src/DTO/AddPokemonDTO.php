<?php

namespace App\DTO;


use Symfony\Component\Validator\Constraints as Assert;

class AddPokemonDTO {

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Regex(pattern: "/^\d+$/", message:"The value should be an integer")]
    public $baseScore = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"string")]
    public $description = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\File(
        maxSize: '1024k',
        extensions: ['jpg','png'],
        extensionsMessage: 'Please upload a valid image: (verify size and extension)',
    )]
    public $image = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\File(
        maxSize: '10m',
        extensions: ['gltf','fbx','txt'],
        extensionsMessage: 'Please upload a valid 3D model: (verify size and extension)',
    )]
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
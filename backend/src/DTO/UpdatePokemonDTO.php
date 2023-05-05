<?php

namespace App\DTO;

use Symfony\Component\Mime\Message;
use Symfony\Component\Validator\Constraints as Assert;

class UpdatePokemonDTO {


    #[Assert\Regex(pattern: "/^\d+$/", message:"The value should be an integer")]
    public $baseScore = null;

    #[Assert\Type(type:"string")]
    public $description = null;

    #[Assert\File(
        maxSize: '1024k',
        extensions: ['jpg','png'],
        // Message: 'Please upload a valid image: (verify size and extension)',
    )]
    public $image = null;


    #[Assert\File(
        maxSize: '10m',
        extensions: ['gltf','fbx','txt'],
        // Message: 'Please upload a valid 3D model: (verify size and extension)',
    )]
    public $model3D = null;


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
<?php

namespace App\DTO;


use Symfony\Component\Validator\Constraints as Assert;

class AddSpawnDTO
{

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"float")]
    public  $latitude = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"float")]
    public  $longitude = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"int")]
    public  $radius = null;

   
    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"int")]
    public $pokemonId;

    public function __construct(array $data)
    {
        $this->latitude = $data['latitude'] ?? null;
        $this->longitude = $data['longitude'] ?? null;
        $this->radius = $data['radius'] ?? null;
        $this->pokemonId = $data['pokemonId'] ?? null;
    }



}

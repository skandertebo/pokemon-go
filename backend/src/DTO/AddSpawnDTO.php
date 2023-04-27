<?php

namespace App\Entity;


use Symfony\Component\Validator\Constraints as Assert;

class AddSpawnDTO
{

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"float")]
    private  $latitude = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"float")]
    private  $longitude = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"int")]
    private  $range = null;

   
    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"int")]
    private $pokemonId;

    public function __construct(array $data)
    {
        $this->latitude = $data['latitude'] ?? null;
        $this->longitude = $data['longitude'] ?? null;
        $this->range = $data['range'] ?? null;
        $this->pokemonId = $data['pokemonId'] ?? null;
    }
}

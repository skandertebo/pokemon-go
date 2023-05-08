<?php

namespace App\DTO;


use Symfony\Component\Validator\Constraints as Assert;

class LocationDTO
{

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"float")]
    public  $latitude = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"float")]
    public  $longitude = null;



    public function __construct(array $data)
    {
        $this->latitude = $data['latitude'] ?? null;
        $this->longitude = $data['longitude'] ?? null;
    }



}

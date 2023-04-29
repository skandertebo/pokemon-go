<?php

namespace App\Entity;


use Symfony\Component\Validator\Constraints as Assert;

class CatchSpawnDTO
{


    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"int")]
    public  $playerId = null;

    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[Assert\Type(type:"int")]
    public  $spawnId = null;

    public function __construct(array $data)
    {
        $this->playerId = $data['playerId'] ?? null;
        $this->spawnId = $data['spawnId'] ?? null;
    }



}

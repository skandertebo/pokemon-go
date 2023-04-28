<?php
namespace App\Service;

use App\Repository\PokemonRepository;
use App\Repository\SpawnRepository;

class SpawnService
{
    public function __construct(private SpawnRepository $spawnRepository,private PokemonRepository $pokemonRepository)
    {
    }
    
}
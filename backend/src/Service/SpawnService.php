<?php
namespace App\Service;

use App\DTO\AddSpawnDTO;
use App\Entity\Spawn;
use App\Repository\PlayerRepository;
use App\Repository\PokemonRepository;
use App\Repository\SpawnRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SpawnService
{
    public function __construct(private SpawnRepository $spawnRepository, private PokemonRepository $pokemonRepository, private PlayerRepository $playerRepository)
    {
    }

    function addSpawn(AddSpawnDTO $data)
    {

        $pokemon=$this->pokemonRepository->find($data->pokemonId);
        if($pokemon==null)
        {
            throw new HttpException(404,"Pokemon of id {$data->pokemonId} not found");
        }
        $spawn=new Spawn();
        $spawn->setLatitude($data->latitude);
        $spawn->setLongitude($data->longitude);
        $spawn->setRadius($data->radius);
        $spawn->setPokemon($pokemon);
        return $this->spawnRepository->save($spawn,true);
    }

    function catchSpawn($playerId,$spawnId)
    {
        $spawn=$this->spawnRepository->find($spawnId);
        $player=$this->playerRepository->find($playerId);
        if($spawn==null)
        {
            throw new HttpException(404,"Spawn of id {$spawnId} not found");
        }
        if($player==null)
        {
            throw new HttpException(404,"Player of id {$playerId} not found");
        }
        if($spawn->getOwner()!=null)
        {
            throw new HttpException(400,"Spawn of id {$spawnId} is already caught");
        }
        $spawn->setOwner($player);
        $spawn->setCaptureDate(new \DateTime());
        return $this->spawnRepository->save($spawn,true);
    }
    
}
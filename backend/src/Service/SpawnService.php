<?php
namespace App\Service;

use App\DTO\AddSpawnDTO;
use App\Entity\Spawn;
use App\Repository\PokemonRepository;
use App\Repository\SpawnRepository;
use App\Service\PlayerService;
use DateTime;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SpawnService
{
    public function __construct(private PLayerService $playerService, private SpawnRepository $spawnRepository, private PokemonRepository $pokemonRepository)
    {
    }



    function addSpawnComm()
    {
        $pokemon=$this->pokemonRepository->find(14);
        $spawn=new Spawn();
        $spawn->setLatitude(36.860418);
        $spawn->setLongitude(10.113047);
        $spawn->setRadius(10000);
        $spawn->setPokemon($pokemon);
        $this->spawnRepository->save($spawn,true);
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
        $player=$this->playerService->getPlayerById($playerId);
        if($spawn==null)
        {
            throw new HttpException(404,"Spawn of id {$spawnId} not found");
        }
        if($spawn->getOwner()!=null)
        {
            throw new HttpException(400,"Spawn of id {$spawnId} is already caught");
        }
        $spawn->setOwner($player);
        $spawn->setCaptureDate(new \DateTime());
        $this->playerService->addScore($player,$spawn);
        return $this->spawnRepository->save($spawn,true);
    }



    function getCaptureHistory($playerId,$dateParam)
    {
        if($dateParam!='all')
        {
            try
            {
                $newDate = new DateTime();
                $newDate->modify('-1 ' . $dateParam);
                return $this->spawnRepository->findCapturedSinceDateByPlayer($playerId,$newDate);
           }
            catch(\Exception $e)
            {
                throw new HttpException(400,"Invalid date parameter");
            }    
        }
        //automatically generated method findByOwner
        return $this->spawnRepository->findByOwner($playerId);
    }




    function getNearbySpawns($latitude,$longitude)
    {
        $spawns=$this->spawnRepository->findBy(['owner'=>null]);
        $nearbySpawns=[];
        foreach($spawns as $spawn)
        {
            dump($latitude,$longitude,$spawn->getLatitude(),$spawn->getLongitude());
            $distance=getDistance($latitude,$longitude,$spawn->getLatitude(),$spawn->getLongitude());
            dump($distance);
            if($distance<=$spawn->getRadius())
            {
                $nearbySpawns[]=$spawn;
            }
        }
        return $nearbySpawns;
    }

    function getUpdates($date)
    {
        $updates=[ "captured" => $this->spawnRepository->findCapturedSinceDate($date), 
                    "spawned" => $this->spawnRepository->findSpawnSinceDate($date)];
        return $updates;
    }

    function getAllSpawns()
    {
        return $this->spawnRepository->findBy(['owner'=>null]);
    }
    
}
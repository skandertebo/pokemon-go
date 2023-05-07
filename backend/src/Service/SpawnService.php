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



    function autoSpawn($latitude,$longitude)
    {
        //you can set the chance that a spawn will happen here (between 0 and 1)
        $chance=1;
        $precision =1000;
        if(mt_rand(0,$precision)/$precision<=$chance)
        {
            //you can set the radius (in meters) of the random generated location with respect to the current location
            $radius=10;
            $newPosition=generateRandomLocation($latitude,$longitude,$radius);

            $pokemons=$this->pokemonRepository->findAll();

            $spawn=new Spawn();

            $spawn->setLatitude($newPosition[0]);
            $spawn->setLongitude($newPosition[1]);

            //the radius is somewhere between 1 and 1000 km 
            $spawn->setRadius(rand(1,1000));

            //getting a random pokemon from the list
            $spawn->setPokemon($pokemons[rand(0,count($pokemons)-1)]);

            $this->spawnRepository->save($spawn,true);
        }
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
    function getCaptureHistory($playerId)
    {
        
        $player=$this->playerRepository->find($playerId);
        if($player==null)
        {
            throw new HttpException(404,"Player of id {$playerId} not found");
        }
        return $this->spawnRepository->findBy(['owner'=>$player]);
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
<?php
namespace App\Service;

use App\DTO\AddSpawnDTO;
use App\Entity\Notification;
use App\Entity\Spawn;
use App\Repository\PlayerRepository;
use App\Repository\PokemonRepository;
use App\Repository\SpawnRepository;
use App\Service\PlayerService;
use DateTime;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class SpawnService
{
    public function __construct(private SpawnRepository $spawnRepository, private PokemonRepository $pokemonRepository, private PlayerRepository $playerRepository, private NotificationService $notificationService, private HubInterface $hub, private PLayerService $playerService)
    {
    }

    public function publishSpawnUpdate(String $type, Spawn $spawn)
    {
        $update = new Update(
            'https://mercure-updates/spawn/',
            json_encode(['type' => $type,
            'body' => [
                'id' => $spawn->getId(),
                'latitude' => $spawn->getLatitude(),
                'longitude' => $spawn->getlongitude(),
                'owner' => $spawn->getOwner(),
                'pokemon' => $spawn->getPokemon(),
                'captureDate' => $spawn->getCaptureDate(),
            ]]
        ));
        $notification = new Notification();
        if($type === 'spawn'){
            $notification->setContenu("A new spawn has been added!");
            $notification = $this->notificationService->createNotification($notification);
            $this->notificationService->addNotificationToAllUsers($notification);
        }else if($type === 'capture'){
            $notification->setContenu("A spawn has been caught!");
            $notification = $this->notificationService->createNotification($notification);
            $concernedUsers = $this->playerRepository->createQueryBuilder('p')
                ->select('p')
                ->where('p.id != :id')
                ->setParameter('id', $spawn->getOwner()->getId())
                ->getQuery()
                ->getResult();
            $this->notificationService->addNotificationToUsers($concernedUsers, $notification);
        }else if($type === 'spawnDelete'){
            $notification->setContenu("A spawn has been deleted");
            $notification = $this->notificationService->createNotification($notification);
            $this->notificationService->addNotificationToAllUsers($notification);
        }
        $this->hub->publish($update);
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
        $result = $this->spawnRepository->save($spawn,true);
        $this->publishSpawnUpdate('spawn', $result);
        return $result;
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
        $result = $this->spawnRepository->save($spawn,true);
        $this->playerService->addScore($player,$spawn);
        $this->publishSpawnUpdate('capture', $result);
        return $result;
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
        dump($playerId);
        return $this->spawnRepository->findByOwnerOrdered($playerId);
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
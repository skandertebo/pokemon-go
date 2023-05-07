<?php
namespace App\Service;

use App\DTO\AddSpawnDTO;
use App\Entity\Notification;
use App\Entity\Spawn;
use App\Repository\PlayerRepository;
use App\Repository\PokemonRepository;
use App\Repository\SpawnRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class SpawnService
{
    public function __construct(private SpawnRepository $spawnRepository, private PokemonRepository $pokemonRepository, private PlayerRepository $playerRepository, private NotificationService $notificationService, private HubInterface $hub)
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
        $result = $this->spawnRepository->save($spawn,true);
        $this->publishSpawnUpdate('capture', $result);
        return $result;
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
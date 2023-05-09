<?php

namespace App\Service;

use App\Entity\Player;
use App\Entity\Spawn;
use App\Entity\Pokemon;
use App\Repository\PlayerRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PlayerService
{

    public function __construct(private PlayerRepository $playerRepository)
    {
    }

    public function getPlayerById(int $id): Player
    {
        $player = $this->playerRepository->find($id);
        if (!$player) {
            throw new HttpException(404, 'Player with id ' . $id . ' does not exist!');
        }
        return $player;
    }

    public function getPlayerByPlayerTag(string $playerTag)
    {
        return $this->playerRepository->findOneByPlayerTag($playerTag);
    }

    public function deletePlayer(Player $player): void
    {
        if($player->getImage())
        {
            unlink("../public/files/images/".$player->getImage());
        }
        //set owner of all spawns to null
        $spawns = $player->getSpawns();
        foreach($spawns as $spawn)
        {
            $spawn->setOwner(null);
        }
        $this->playerRepository->save($player,true);
        $this->playerRepository->remove($player,true);
    }

    public function updatePlayer(int $id, $data): Player
    {   
        dump($data);
        $player = $this->getPlayerById($id);
        
        if ($data->playerTag) {
            if($this->getPlayerByPlayerTag($data->playerTag)){
            throw new \InvalidArgumentException( 'PlayerTag ' . $data->playerTag . ' already exists!. Please choose another one.');
        }
            $player->setPlayerTag($data->playerTag);
                
        }
        
        if($data->image){
            if($player->getImage())
            {
                unlink("../public/files/images/".$player->getImage());
            }
            $imageFileName= pathinfo($data->image->getClientOriginalName(), PATHINFO_FILENAME). '_' . uniqid() . '.' . $data->image->getClientOriginalExtension();
            $data->image->move('../public/files/images',$imageFileName);
            $player->setImage($imageFileName);
        }
        else if ($data -> image == "")
        {
            $player -> setImage("");
        }


        $this->playerRepository->save($player,true);
        return $player;
    }

    // get all players ordered by score
    public function getOrderedPlayers($page,$limit): array
    {
        $offset = ($page - 1) * $limit;
        return $this->playerRepository->findBy([], ['score' => 'DESC'], $limit, $offset);
    }

   

    public function addScore(Player $player,Spawn $spawn): void
    {   $score=$spawn->getPokemon()->getBaseScore();
        $player->setScore($player->getScore() + $score);
        $this->playerRepository->save($player,true);
    }
}

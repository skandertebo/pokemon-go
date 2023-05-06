<?php

namespace App\Service;

use App\Entity\Player;
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
        $player = $this->getPlayerById($id);
        
        if ($data->playerTag) {
        
            $this->checkPlayerTag($data->playerTag);
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


        $this->playerRepository->save($player,true);
        return $player;
    }

    // get all players ordered by score
    public function getOrderedPlayers(): array
    {
        return $this->playerRepository->findBy([], ['score' => 'DESC']);
    }

    //check unique playerTag
    public function checkPlayerTag(string $playerTag){
        $player = $this->getPlayerByPlayerTag($playerTag);
        if($player){
            throw new HttpException(400, 'PlayerTag ' . $playerTag . ' already exists!. Please choose another one.');
        }
    }
}

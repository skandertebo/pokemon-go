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
        $this->playerRepository->remove($player,true);
    }

    public function updatePlayer(Player $player): Player
    {
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

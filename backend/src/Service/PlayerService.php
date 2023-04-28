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

    public function deletePlayer(int $id): void
    {
        $player = $this->getPlayerById($id);
        $this->playerRepository->remove($player);
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
}

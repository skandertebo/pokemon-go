<?php

class PlayerService{
    
    public function __construct(private PlayerRepository $playerRepository){}

    public function getPlayerById(int $id): Player
    {
        $player = $this->playerRepository->find($id);
        if (!$player) {
            throw new HttpException(404, 'Player with id ' . $id . ' does not exist!');
        }
        return $player;
    }

    public function deletePlayer(int $id): void
    {
        $player = $this->getPlayerById($id);
        $this->playerRepository->delete($player);
    }

    public function updatePlayerTag(Player $player, string $playerTag): Player
    {
        $player->setPlayerTag($playerTag);
        $this->playerRepository->update($player);
        return $player;
    }

    public function updateImage(Player $player, string $image): Player
    {
        $player->setImage($image);
        $this->playerRepository->updateImage($player);
        return $player;
    }

    // get all players ordered by score
    public function getOrderedPlayers(): array
    {
        return $this->playerRepository->findBy([], ['score' => 'DESC']);
    }
}
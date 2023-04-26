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

    public function vaidatePlayerTag(string $playerTag): void
    {
        $player = $this->playerRepository->findOneBy(['playerTag' => $playerTag]);
        if ($player && $player->getPlayerTag() === $playerTag) {
            throw new HttpException(400, 'Player with playerTag ' . $playerTag . ' already exists!');
        }
        if (strlen($playerTag) < 3) {
            throw new HttpException(400, 'PlayerTag must be at least 3 characters long!');
        }
        if (strlen($playerTag) > 255) {
            throw new HttpException(400, 'PlayerTag must be at most 255 characters long!');
        }
    }
}
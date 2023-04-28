<?php

namespace App\Controller;

use App\Entity\Player;
use App\Service\PlayerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use function App\createErrorResponse;

/**
 * @Route("/player", name="player")
 */

class PlayerController extends AbstractController
{

    public function __construct(private PlayerService $playerService, private ValidatorInterface $validator)
    {
    }
    /**
     * @Route("/leaderboard", name="leaderboard", methods={"GET"})
     */
    public function leaderboard(): Response
    {
        $players = $this->playerService->getOrderedPlayers();
        return $this->json([
            'players' => $players,
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/PlayerController.php',
        ]);
    }

    /**
     * Route("/{id}", name="getPlayer", methods={"GET"})
     */

    public function getPlayer($id): Response
    {
        //check if player with $id exists
        try {
            $player = $this->playerService->getPlayerById($id);
        } catch (HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }
        return $this->json([
            'player' => $player,
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/PlayerController.php',
        ]);
    }

    /**
     * Route("/{id}", name="DeletePlayer", methods={"DELETE"})
     */
    public function deletePlayer($id): Response
    {
        //check if player with $id exists
        try {
            $player = $this->playerService->getPlayerById($id);
            var_dump($player);
        } catch (HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }
        $this->playerService->deletePlayer($id);
        return $this->json([
            'message' => 'Player deleted successfully',
        ]);
    }

    /**
     * Route("/{id}", name="UpdatePlayer", methods={"PATCH"})
     */
    public function updatePlayer($id, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        //check if player with $id exists
        try {
            $player = $this->playerService->getPlayerById($id);
        } catch (HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }

        //set image without checking
        if (isset($data['image'])) {
            $player->setImage($data['image']);
        }
        
        //set playerTag with checking
        if (isset($data['playerTag'])) {
            $playerWithPlayerTag = $this->playerService->getPlayerByPlayerTag($data['playerTag']);
            if (isset($playerWithPlayerTag) && $playerWithPlayerTag->getId() != $id) {
                return createErrorResponse("PlayerTag already exists", 409);
            }
            $player->setPlayerTag($data['playerTag']);
        }

        $errors = $this->validator->validate($player, null, ['update']);
        if (count($errors) > 0) {
            createValidationErrorResponse($errors);
        }

        $this->playerService->updatePlayer($player);

        return $this->json([
            'player' => $player,
        ]);
    }
}

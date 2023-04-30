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
        return $this->json($players);
    }

    /**
     * Route("/{id}", name="getPlayer", methods={"GET"})
     */

    public function getPlayer($id): JsonResponse
    {
        //check if player with $id exists
        try {
            $player = $this->playerService->getPlayerById($id);
        } catch (HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }
        return new JsonResponse($player);
    }

    /**
     * Route("/{id}", name="DeletePlayer", methods={"DELETE"})
     */
    public function deletePlayer($id): JsonResponse
    {
        //check if player with $id exists
        try {
            $player = $this->playerService->getPlayerById($id);
        } catch (HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }
        $this->playerService->deletePlayer($player);
        return new JsonResponse("player deleted successfuly");
    }

    /**
     * Route("/{id}", name="UpdatePlayer", methods={"PATCH"})
     */
    public function updatePlayer($id, Request $request): JsonResponse
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
            try {
                $this->playerService->checkPlayerTag($data['playerTag']);
                $player->setPlayerTag($data['playerTag']);
            } catch (HttpException $e) {
                return createErrorResponse($e->getMessage(), $e->getStatusCode());
            }
        }

        $errors = $this->validator->validate($player, null, ['update']);
        if (count($errors) > 0) {
            createValidationErrorResponse($errors);
        }

        $this->playerService->updatePlayer($player);

        return new JsonResponse($player);
    }
}

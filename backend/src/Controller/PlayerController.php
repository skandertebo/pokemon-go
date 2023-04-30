<?php

namespace App\Controller;

use App\Entity\Player;
use App\Service\PlayerService;
use FOS\RestBundle\Controller\Annotations\Get;
use PHPUnit\Util\Json;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use function App\createErrorResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use function App\createValidationErrorResponse;

/**
 * @Route("/api/player", name="player")
 */

class PlayerController extends AbstractController
{

    public function __construct(private PlayerService $playerService, private ValidatorInterface $validator)
    {
    }

    #[Route('', name: 'leaderboard', methods: ['get'])]
    #[Security("is_granted('ROLE_USER')")]
    public function leaderboard(): JsonResponse
    {
        $players = $this->playerService->getOrderedPlayers();
        return $this->json($players);
    }

    #[Route('/{id}', name: 'getPlayer', methods: ['GET'])]
    #[Security("is_granted('ROLE_USER')")]
    public function getPlayer($id): JsonResponse
    {
        //check if player with $id exists
        try {
            // $id = $request->attributes->get('jwt_payload')['id'];
            $player = $this->playerService->getPlayerById($id);
        } catch (HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }
        return new JsonResponse($player);
    }

    #[Route('/{id}', name: 'deletePlayer', methods: ['DELETE'])]
    #[Security("is_granted('ROLE_USER')")]
    public function deletePlayer($id): JsonResponse
    {        
        // $id = $request->attributes->get('jwt_payload')['id'];
        $player = $this->playerService->getPlayerById($id);
        $this->playerService->deletePlayer($player);
        return new JsonResponse("player deleted successfuly");
    }

    //delete

    #[Route('/', name: 'updatePlayer', methods: ['PUT'])]
    #[Security("is_granted('ROLE_USER')")]
    public function updatePlayer(Request $request): JsonResponse
    {
        $id = $request->attributes->get('jwt_payload')['id'];
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

        return new JsonResponse([
            "message" => "player updated successfuly",
            "player" => $player
        ]);
    }
}

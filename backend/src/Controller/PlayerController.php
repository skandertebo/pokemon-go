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
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Patch;
use PHPUnit\Util\Json;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use function App\createValidationErrorResponse;
use function App\createErrorResponse;

/**
 * @Route("/api/player", name="player")
 */

class PlayerController extends AbstractController
{

    public function __construct(private PlayerService $playerService, private ValidatorInterface $validator)
    {
    }
    #[Get("/leaderboard", name: "GetLeaderboard")]
    #[Security("is_granted('ROLE_USER')")]
    public function leaderboard(): Response
    {
        $players = $this->playerService->getOrderedPlayers();
        return $this->json($players);
    }

    #[Get("/{id}", name: "GetPlayer")]
    #[Security("is_granted('ROLE_USER')")]
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

    #[Delete("/{id}", name: "DeletePlayer")]    
    #[Security("is_granted('ROLE_USER')")]
    public function deletePlayerByPlayer(Request $request): JsonResponse
    {
        $id = $request->attributes->get('jwt_payload')['id'];
        $player = $this->playerService->getPlayerById($id);
        $this->playerService->deletePlayer($player);
        return new JsonResponse("player deleted successfuly");
    }

    #[Delete('/{id}', name: 'deletePlayerByAdmin')]
    #[Security("is_granted('ROLE_ADMIN')")]
    public function deletePlayerByAdmin($id): JsonResponse
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


    #[Patch("/{id}", name: "updatePlayer")]
    #[Security("is_granted('ROLE_PLAYER')")]
    public function updatePlayer(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $id = $request->attributes->get('jwt_payload')['id'];
        $player = $this->playerService->getPlayerById($id);

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

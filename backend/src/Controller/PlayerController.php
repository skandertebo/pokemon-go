<?php 

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\PlayerService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Functions\CreateValidationErrorResponse ;


/**
 * @Route("/api", name="api_")
 */

 class PlayerController extends AbstractController
 {

    public function __construct(private PlayerService $playerService)
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
     * Route("/player/{id}", name="player", methods={"GET"})
     */

    public function getPlayer($id): Response
    {
        $player = $this->playerService->getPlayer($id);
        return $this->json([
            'player' => $player,
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/PlayerController.php',
        ]);
    }

   

    public function deletePlayer($id): Response
    {
        $player = $this->playerService->deletePlayer($id);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($player);
        $entityManager->flush();
        return $this->json([
            'message' => 'Player deleted successfully',
        ]);
    }

    public function updateImage($id, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $player = $this->playerService->getPlayer($id);
        $player->setImage($data['image']);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($player);
        $entityManager->flush();
        return $this->json([
            'message' => 'Imahe updated successfully',
        ]);
    }

    public function updatePlayerTag($id, Request $request): Response
    {
        $player = $this->userService->getPlayer($id);
        $data = json_decode($request->getContent(), true);
        $playerTag = $data['playerTag'];
        try{
            $this->playerService->validatePlayerTag($playerTag);
        } catch (\InvalidArgumentException $e) {
            return createValidationErrorResponse($e);
        }
        $player->setPlayerTag($playerTag);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($player);
        $entityManager->flush();
        return $this->json([
            'message' => 'Player tag updated successfully',
        ]);
    }

 }
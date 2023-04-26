<?php 

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api", name="api_")
 */

 class PlayerController extends AbstractController
 {
    /**
     * @Route("/leaderboard", name="leaderboard", methods={"GET"})
     */
    public function leaderboard(): Response
    {
        $players = $this->getDoctrine()->getRepository(Player::class)->findBy([], ['score' => 'DESC']);
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
        $player = $this->getDoctrine()->getRepository(Player::class)->find($id);
        return $this->json([
            'player' => $player,
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/PlayerController.php',
        ]);
    }

   

    public function deletePlayer($id): Response
    {
        $player = $this->getDoctrine()->getRepository(Player::class)->find($id);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($player);
        $entityManager->flush();
        return $this->json([
            'message' => 'Player deleted successfully',
        ]);
    }

    public function updateImage($id, Request $request): Response
    {
        $player = $this->getDoctrine()->getRepository(Player::class)->find($id);
        $data = json_decode($request->getContent(), true);
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
        $player = $this->getDoctrine()->getRepository(Player::class)->find($id);
        $data = json_decode($request->getContent(), true);
        $player->setPlayerTag($data['playerTag']);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($player);
        $entityManager->flush();
        return $this->json([
            'message' => 'Player tag updated successfully',
        ]);
    }

 }
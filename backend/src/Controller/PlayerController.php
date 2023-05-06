<?php

namespace App\Controller;

use App\Entity\Player;
use App\Service\PlayerService;
use App\Service\UserService;
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
use App\DTO\UpdateUserDTO;
use FOS\RestBundle\Controller\Annotations\Post;

use function App\createValidationErrorResponse;
use function App\createErrorResponse;

/**
 * @Route("/player", name="player")
 */

class PlayerController extends AbstractController
{

    public function __construct(private PlayerService $playerService,private UserService $userService, private ValidatorInterface $validator)
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

    #[Delete("", name: "DeletePlayer")]    
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

// this is a POST method because of a limitation of PHP in reading form-data for PATCH and PUT requests
    #[Post("", name: "updatePlayer")]
    #[Security("is_granted('ROLE_USER')")]
    public function updatePlayer(Request $request): JsonResponse
    {
        $id = $request->attributes->get('jwt_payload')['id'];
        
        $data= [
            "image" => $request->files->get('image') ,
            "playerTag" => $request -> request -> get('playerTag') ,
            "email" => $request -> request -> get('email') ,
            "password" => $request -> request -> get('password') 
        ];

        $userDTO = new UpdateUserDTO($data); 
        dump($userDTO);

        $errors = $this->validator->validate($userDTO);
        if (count($errors) > 0) {
            return createValidationErrorResponse($errors); }
        try {
            $this->playerService->updatePlayer($id,$userDTO);
            $user = $this->userService->updateUser($id, $data);
    
        } catch (\InvalidArgumentException $e) {
            return createErrorResponse($e->getMessage(), 400);
        }
        catch (HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }

        $player = $this->playerService->getPlayerById($id);
    
        return new JsonResponse([
            "message" => "player updated successfuly",
            "player" => $player
        ]);
    }
}

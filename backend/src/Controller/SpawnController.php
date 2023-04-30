<?php

namespace App\Controller;

use App\DTO\AddSpawnDTO;
use App\Entity\CatchSpawnDTO;
use App\Entity\Spawn;
use App\Service\SpawnService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\BrowserKit\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

use function App\createErrorResponse;

/**
     * @Route("/spawn", name="spawn")
*/
class SpawnController extends AbstractController
{

    
    public function __construct(private SpawnService $spawnService, private ValidatorInterface $validator)
    {
    }

    #[Route('', name: 'addSpawn',methods:['POST'])]
        /**
     * @Security("is_granted('ROLE_ADMIN')")
     */
    public function addSpawn(HttpFoundationRequest $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $dto=new AddSpawnDTO($data);
        $errors=$this->validator->validate($dto,null);
        if(count($errors)>0)
        {
            return createValidationErrorResponse($errors);
        }
        try
        {
            $newPokemon=$this->spawnService->addSpawn($dto);
        }
        catch(HttpException $e)
        {
            return createErrorResponse($e->getMessage(),$e->getStatusCode());
        }
        return new JsonResponse($newPokemon) ;
         
    }
    #[Route('/catch', name: 'catchSpawn',methods:['POST'])]
    public function catchSpawn(HttpFoundationRequest $request)
    {
        $data = json_decode($request->getContent(), true);
        $dto= new CatchSpawnDTO($data);
        $errors=$this->validator->validate($dto,null);
        if(count($errors)>0)
        {
            return createValidationErrorResponse($errors);
        }
        try
        {
            $newPokemon=$this->spawnService->catchSpawn($dto->playerId,$dto->spawnId);
        }
        catch(HttpException $e)
        {
            return createErrorResponse($e->getMessage(),$e->getStatusCode());
        }
        return new JsonResponse($newPokemon) ;
    }
    #[Route('/history/{playerId}', name: 'getSpawnHistory',methods:['GET'])]
            /**
     * @Security("is_granted('ROLE_USER')")
     */
    public function getCaptureHistory(HttpFoundationRequest $request, $playerId)
    {
        dump($request->attributes->get('jwt_payload')['id']);
        try
        {
            $newPokemon=$this->spawnService->getCaptureHistory($playerId);
        }
        catch(HttpException $e)
        {
            return createErrorResponse($e->getMessage(),$e->getStatusCode());
        }
        return new JsonResponse($newPokemon) ;
    }
    #[Route('/near', name: '_getNearbySpawns',methods:['GET'])]
    public function getSpawns(HttpFoundationRequest $request):JsonResponse
    {
        $latitude=$request->query->get('latitude');
        $longitude=$request->query->get('longitude');
        if($latitude==null && $longitude==null)
        {
            return new JsonResponse($this->spawnService->getAllSpawns());
        }
        if($latitude==null || $longitude==null)
        {
            return createErrorResponse("latitude and longitude are required if you're looking for nearby spawns",400);
        }
        try
        {
            $spawns=$this->spawnService->getNearbySpawns(floatval($latitude),floatval($longitude));
        }
        catch(HttpException $e)
        {
            return createErrorResponse($e->getMessage(),$e->getStatusCode());
        }
        return new JsonResponse($spawns) ;
    }

}

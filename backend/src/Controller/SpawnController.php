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

/**
     * @Route("/spawn", name="spawn")
*/
class SpawnController extends AbstractController
{

    
    public function __construct(private SpawnService $spawnService, private ValidatorInterface $validator)
    {
    }

    #[Route('', name: 'addSpawn',methods:['POST'])]
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
    public function getCaptureHistory($playerId)
    {
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

}

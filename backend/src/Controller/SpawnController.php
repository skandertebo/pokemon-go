<?php

namespace App\Controller;

use App\Entity\AddSpawnDTO;
use App\Entity\Spawn;
use App\Service\SpawnService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\BrowserKit\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\HttpFoundation\Response;
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
        // if(!isset($data['longitude']) || !isset($data['latitude']) || !isset($data['range']) || !isset($data['pokemonId']))
        // {
        //     return createErrorResponse("Missing parameters (latitude/longitude/range/pokemonId are required)", Response::HTTP_BAD_REQUEST);
        // }
        // $spawn=new Spawn($data['longitude'],$data['latitude'],$data['range']);
        $dto=new AddSpawnDTO($data);
        $errors=$this->validator->validate($dto,null);
        if(count($errors)>0)
        {
            return createValidationErrorResponse($errors);
        }
        return new JsonResponse([
            'message' => 'Spawn added successfully',
        ]);
    }
}

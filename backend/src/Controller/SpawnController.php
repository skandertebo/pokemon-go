<?php

namespace App\Controller;

use App\DTO\AddSpawnDTO;
use App\DTO\LocationDTO;
use App\Entity\CatchSpawnDTO;
use App\Entity\Spawn;
use App\Service\SpawnService;
use DateTimeZone;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\BrowserKit\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Validator\Constraints\DateTime;

use function App\createErrorResponse;
use function App\createValidationErrorResponse;

/**
     * @Route("/spawn", name="spawn")
*/
class SpawnController extends AbstractController
{

    
    public function __construct(private SpawnService $spawnService, private ValidatorInterface $validator)
    {
    }




    #[Route('/auto', name: 'autoSpawn',methods:['POST'])]
            /**
     * @Security("is_granted('ROLE_USER')")
     */
    public function autoSpawn(HttpFoundationRequest $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $dto=new LocationDTO($data);
        $errors=$this->validator->validate($dto,null);
        if(count($errors)>0)
        {
            return createValidationErrorResponse($errors);
        }
        $newPokemon=$this->spawnService->autoSpawn($dto->latitude,$dto->longitude);
        return new JsonResponse() ;
        
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
     /**
     * @Security("is_granted('ROLE_USER')")
     */
    public function catchSpawn(HttpFoundationRequest $request)
    {
        $id = $request->attributes->get('jwt_payload')['id'];
        $data = json_decode($request->getContent(), true);
        $dto= new CatchSpawnDTO($data);
        $errors=$this->validator->validate($dto,null);
        if(count($errors)>0)
        {
            return createValidationErrorResponse($errors);
        }
        try
        {
            $newPokemon=$this->spawnService->catchSpawn($id,$dto->spawnId);
        }
        catch(HttpException $e)
        {
            return createErrorResponse($e->getMessage(),$e->getStatusCode());
        }
        return new JsonResponse($newPokemon) ;
    }
    #[Route('/history', name: 'getSpawnHistory',methods:['GET'])]
            /**
     * @Security("is_granted('ROLE_USER')")
     */
    public function getCaptureHistory(HttpFoundationRequest $request)
    {
        try
        {
            $id = $request->attributes->get('jwt_payload')['id'];
            $dateParam=$request->query->get('date');
            $newPokemon=$this->spawnService->getCaptureHistory($id,$dateParam);
        }
        catch(HttpException $e)
        {
            return createErrorResponse($e->getMessage(),$e->getStatusCode());
        }
        return new JsonResponse($newPokemon) ;
    }
    
    #[Route('/near', name: '_getNearbySpawns',methods:['GET'])]
    #[Security("is_granted('ROLE_USER')")]
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

    #[Route('/updates', name: '_getUpdates', methods: ['GET'])]
    #[Security("is_granted('ROLE_USER')")]
    public function getUpdates(HttpFoundationRequest $request): JsonResponse
    {
        $dateTimeString = $request->query->get('datetime');
        $dateTimeConstraint = new DateTime([
            'format' => 'Y-m-d\TH:i:s\Z',
            'message' => 'The datetime must be in the format "YYYY-MM-DDTHH:MM:SSZ".',
        ]);
        $errors = $this->validator->validate($dateTimeString, $dateTimeConstraint);
    
        if ($errors->count() > 0) {
            return createValidationErrorResponse($errors);
        }
        $dateTime = new \DateTime($dateTimeString);
        
        return new JsonResponse($this->spawnService->getUpdates($dateTime));
    }
}

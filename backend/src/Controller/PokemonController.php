<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Service\PokemonService;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Pokemon;
use App\DTO\AddPokemonDTO;
use App\DTO\UpdatePokemonDTO;
use App\UtilityClasses\FormData;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpKernel\Exception\HttpException;
use function App\createErrorResponse;
use function App\createValidationErrorResponse;


#[Route('/pokemon', name: 'pokemon_')]
class PokemonController extends AbstractController
{
    public function __construct(private PokemonService $pokemonService, private ValidatorInterface $validator)
    {
    }
    
    #[Route('', name: 'app_pokemon_list' , methods: ['GET'])]
    public function getPokemonList(): JsonResponse
    {
        return new JsonResponse([
            'list' => $this->pokemonService->getPokemonList()
        ]);
    }

    #[Route('/{id}', name: 'app_pokemon_id' , methods: ['GET'])]
    public function getPokemonById(int $id): JsonResponse
    {
        try {
            $pokemon = $this->pokemonService->getPokemonById($id);
        } catch (HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }
        return new JsonResponse($pokemon);
    }

    #[Route('', name: 'app_pokemon_create' , methods: ['POST'])]
    public function createPokemon(Request $request)
    {
        $data= [
            "image" => $request->files->get('imageFile'),
            "model3D" => $request -> files-> get('modelFile'),
            "name" => $request -> request -> get('name'),
            "description" => $request -> request -> get('description'),
            "baseScore" => $request -> request -> get('baseScore')
        ];
        $dto = new AddPokemonDTO($data);
        $errors = $this->validator->validate($dto, null);
        
        if (count($errors) > 0) {
            return createValidationErrorResponse($errors);
        }

        $pokemon = $this->pokemonService->createPokemon($dto);
        return new JsonResponse($pokemon);
    }

   

//This is a post request due to a bug in php for parsing form-data of patch requests
    #[Route('/{id}', name: 'app_pokemon_update' , methods: ['POST'])]
    public function updatePokemon(Request $request,$id ): JsonResponse
    {
        $fd = new FormData($request->getContent());
        $data= [
            "image" => $request->files->get('imageFile') ,
            "model3D" => $request -> files-> get('modelFile') ,
            "name" => $request -> request -> get('name') ,
            "description" => $request -> request -> get('description') ,
            "baseScore" => $request -> request -> get('baseScore') 
        ];
        
        $dto = new UpdatePokemonDTO($data);
        $errors = $this->validator->validate($dto, null);
        if (count($errors) > 0) {
            return createValidationErrorResponse($errors);
        }
        try
        {
            $pokemon = $this->pokemonService->updatePokemon($id,$dto);
        }
        catch (HttpException $e)
        {
            return createErrorResponse($e->getMessage(),$e->getStatusCode());
        }
        return new JsonResponse($pokemon);
    }
   
    #[Route('/{id}', name: 'app_pokemon_delete' , methods: ['DELETE'])]
    public function deletePokemon(int $id): JsonResponse
    {
        try{
            $pokemon = $this->pokemonService->deletePokemon($id);
        }catch(HttpException $e){
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }    
        return new JsonResponse(['message'=>'deleted succesfully']);
    }
}

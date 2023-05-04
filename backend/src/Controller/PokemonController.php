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

    #[Route('/test', name:'test', methods:['POST'])]
    public function upload(Request $request): Response
    {
        /** @var UploadedFile $file */
        $file = $request->files->get('file');
        $name = $request-> request -> get('name');
        dump($name);
        // Process the uploaded file as required.
        // For example, move the file to a directory on the server using $file->move()
        $file->move('../public/Files/pokemonImages');
        return new Response('File uploaded successfully!');
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
        dump($data);
        $dto = new AddPokemonDTO($data);
        $errors = $this->validator->validate($dto, null);
        
        if (count($errors) > 0) {
            return createValidationErrorResponse($errors);
        }

        $pokemon = $this->pokemonService->createPokemon($dto);
        return new JsonResponse($pokemon);
    }

   


    #[Route('/{id}', name: 'app_pokemon_update' , methods: ['PUT'])]
    public function updatePokemon(int $id ,Request $request ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        try{
            $pokemon = $this->pokemonService->getPokemonById($id);
        }catch(HttpException $e){
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }
        $dto = new AddPokemonDTO($data);
        $errors = $this->validator->validate($dto, null);
        if (count($errors) > 0) {
            return createValidationErrorResponse($errors);
        }
        $pokemon = $this->pokemonService->updatePokemon($pokemon,$dto);
        return new JsonResponse($pokemon);
    }
   
    #[Route('/{id}', name: 'app_pokemon_delete' , methods: ['DELETE'])]
    public function deletePokemon(int $id): JsonResponse
    {
        try{
            $pokemon = $this->pokemonService->getPokemonById($id);
        }catch(HttpException $e){
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }    
        $pokemon = $this->pokemonService->deletePokemon($pokemon);
        return new JsonResponse($pokemon);
    }
}

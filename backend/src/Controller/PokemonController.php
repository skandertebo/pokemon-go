<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Service\PokemonService;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use function App\createErrorResponse;
use function APP\createValidationErrorResponse;
use App\Entity\Pokemon;
use Symfony\Component\HttpKernel\Exception\HttpException;


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
            return new JsonResponse([
                'pokemon' => $pokemon
            ]);
        } catch (\HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }
    }

    #[Route('', name: 'app_pokemon_create' , methods: ['POST'])]
    public function createPokemon(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $pokemon = $this->pokemonService->createPokemon($data);
        $pokemon = $this->pokemonService->addPokemon($pokemon);
        return new JsonResponse([
            'pokemon' => $pokemon
        ]);
    }

    #[Route('/{id}', name: 'app_pokemon_update' , methods: ['PUT'])]
    public function updatePokemon(int $id ,Request $request ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        try {
            $pokemon = $this->pokemonService->updatePokemon($id, $data);
            return new JsonResponse([
                'pokemon' => $pokemon
            ]);
        } catch (\HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }
    }
   
    #[Route('/{id}', name: 'app_pokemon_delete' , methods: ['DELETE'])]
    public function deletePokemon(int $id): JsonResponse
    {
        try {
            $pokemon = $this->pokemonService->deletePokemon($id);
            return new JsonResponse([
                'pokemon' => $pokemon
            ]);
        } catch (\HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }
    }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api', name: 'api_')]
class PokemonController extends AbstractController
{
    #[Route('/pokemon', name: 'app_pokemon_list' , methods: ['GET'])]
    public function getPokemonList(): JsonResponse
    {
        return new JsonResponse([
            'hello' =>  'hello'
        ]);
    }

    #[Route('/pokemon/{id}', name: 'app_pokemon_id' , methods: ['GET'])]
    public function getPokemonById(int $id): JsonResponse
    {
        return new JsonResponse([
            'id' => $id
        ]);
    }

    #[Route('/pokemon', name: 'app_pokemon_create' , methods: ['POST'])]
    public function createPokemon(): JsonResponse
    {
        return new JsonResponse([
            'create' =>  'pokemon'
        ]);
    }

    #[Route('/pokemon/{id}', name: 'app_pokemon_update' , methods: ['PUT'])]
    public function updatePokemon(int $id ,Request $request ): JsonResponse
    {
        return new JsonResponse([
            'id' => $id
        ]);
    }
   
    #[Route('/pokemon/{id}', name: 'app_pokemon_delete' , methods: ['DELETE'])]
    public function deletePokemon(int $id): JsonResponse
    {
        return new JsonResponse([
            'id' => $id
        ]);
    }
}

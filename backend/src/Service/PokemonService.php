<?php 

namespace App\Service;

use App\Entity\Pokemon;
use App\Repository\PokemonRepository;
use Doctrine\ORM\EntityManagerInterface;  
use Symfony\Component\HttoKernel\Exception\HttpException;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use function App\createErrorResponse;
use function APP\createValidationErrorResponse;


class PokemonService {

    public function __construct(private PokemonRepository $pokemonRepository, private ValidatorInterface $validator)
    {
    }

    public function getPokemonList(): array
    {
        return $this->pokemonRepository->findAll();
    }
    public function getPokemonById(int $id): Pokemon
    {
        $pokemon = $this->pokemonRepository->find($id);
        if(!$pokemon){
            throw new HttpException(404, "Pokemon with id $id not found");
        }
        return $pokemon;
    }
    public function addPokemon(Pokemon $pokemon): Pokemon
    {
        $this->pokemonRepository->save($pokemon, true);
        return $pokemon;
    }
    public function createPokemon(array $data): Pokemon
    {
        $pokemon = new Pokemon();
        $pokemon->setName($data['name']);
        $pokemon->setDescription($data['description']);
        $pokemon->setBaseScore($data['baseScore']);
        $pokemon->setImage($data['image']);
        $pokemon->setModel3D($data['model3D']);
        $errors = $this->validator->validate($pokemon);
        if (count($errors) > 0) {
            return createValidationErrorResponse($errors);
        }
        return $pokemon;
    }
    public function deletePokemon(int $id): Pokemon
    {
        try {
            $pokemon = $this->getPokemonById($id);
        }catch (\HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }
        $this->pokemonRepository->remove($pokemon, true);
        return $pokemon;
    }
    public function updatePokemon(int $id, array $data): Pokemon
    {
        try {
            $pokemon = $this->getPokemonById($id);
        }catch (\HttpException $e) {
            return createErrorResponse($e->getMessage(), $e->getStatusCode());
        }
        if(isset($data['name'])){
            $pokemon->setName($data['name']);
        }
        if(isset($data['description'])){
            $pokemon->setDescription($data['description']);
        }
        if(isset($data['baseScore'])){
            $pokemon->setBaseScore($data['baseScore']);
        }
        if(isset($data['image'])){
            $pokemon->setImage($data['image']);
        }
        if(isset($data['model3D'])){
            $pokemon->setModel3D($data['model3D']);
        }
        $errors = $this->validator->validate($pokemon);
        if (count($errors) > 0) {
            return createValidationErrorResponse($errors);
        }
        $this->pokemonRepository->save($pokemon, true);
        return $pokemon;
    }
}

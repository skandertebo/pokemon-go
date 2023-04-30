<?php 

namespace App\Service;

use App\Entity\Pokemon;
use App\Repository\PokemonRepository;
use Doctrine\ORM\EntityManagerInterface;  
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\DTO\AddPokemonDTO;
use Symfony\Component\HttpKernel\Exception\HttpException;

;

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
            throw new HttpException(404, "Pokemon with id {$id} not found");
        }
        return $pokemon;
    }

    public function createPokemon(AddPokemonDTO $data): Pokemon
    {
        $pokemon = new Pokemon();
        $pokemon->setName($data->name);
        $pokemon->setDescription($data->description);
        $pokemon->setBaseScore($data->baseScore);
        $pokemon->setImage($data->image);
        $pokemon->setModel3D($data->model3D);
        $this->pokemonRepository->save($pokemon, true);
        return $pokemon;
    }

    public function deletePokemon(Pokemon $pokemon) : Pokemon
    {
        $this->pokemonRepository->remove($pokemon, true);
        return $pokemon;
    }
    public function updatePokemon(Pokemon $pokemon,AddPokemonDTO $data): Pokemon
    {
        if($data->name){
            $pokemon->setName($data->name);
        }
        if($data->description){
            $pokemon->setDescription($data->description);
        }
        if($data->baseScore){
            $pokemon->setBaseScore($data->baseScore);
        }
        if($data->image){
            $pokemon->setImage($data->image);
        }
        if($data->model3D){
            $pokemon->setModel3D($data->model3D);
        }
        $this->pokemonRepository->save($pokemon, true);
        return $pokemon;
    }
}

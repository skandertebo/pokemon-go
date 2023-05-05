<?php 

namespace App\Service;

use App\Entity\Pokemon;
use App\Repository\PokemonRepository;
use Doctrine\ORM\EntityManagerInterface;  
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\DTO\AddPokemonDTO;
use App\DTO\UpdatePokemonDTO;
use Symfony\Component\HttpKernel\Exception\HttpException;

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
        $pokemon->setBaseScore((int)$data->baseScore);
        $imageFileName= pathinfo($data->image->getClientOriginalName(), PATHINFO_FILENAME). '_' . uniqid() . '.' . $data->image->getClientOriginalExtension();
        $modelFileName= pathinfo($data->model3D->getClientOriginalName(), PATHINFO_FILENAME). '_' . uniqid() . '.' . $data->model3D->getClientOriginalExtension();
        $data->image->move('../public/files/images',$imageFileName);
        $data->model3D->move('../public/files/3Dmodels',$modelFileName);
        $pokemon->setImage($imageFileName);
        $pokemon->setModel3D($modelFileName);
        $this->pokemonRepository->save($pokemon, true);
        return $pokemon;
    }

    public function deletePokemon($id)
    {
        $pokemon = $this->pokemonRepository->find($id);
        if(!$pokemon)
        {
            throw new HttpException(404,"Pokemon of id " .$id ." not found");
        }
        if($pokemon->getImage())
        {
            unlink("../public/files/images/".$pokemon->getImage());
        }
        if($pokemon->getModel3D())
        {
            unlink("../public/files/3Dmodels/".$pokemon->getModel3D());
        }
        $this->pokemonRepository->remove($pokemon, true);
    }


    public function updatePokemon(int $id,UpdatePokemonDTO $data): Pokemon
    {
        $pokemon = $this->pokemonRepository->find($id);
        if(!$pokemon)
        {
            throw new HttpException(404,"Pokemon of id " .$id ." not found");
        }

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
            if($pokemon->getImage())
            {
                unlink("../public/files/images/".$pokemon->getImage());
            }
            $imageFileName= pathinfo($data->image->getClientOriginalName(), PATHINFO_FILENAME). '_' . uniqid() . '.' . $data->image->getClientOriginalExtension();
            $data->image->move('../public/files/images',$imageFileName);
            $pokemon->setImage($imageFileName);
        }
        if($data->model3D){
            if($pokemon->getModel3D())
            {
                unlink("../public/files/3Dmodels/".$pokemon->getModel3D());
            }
            $modelFileName= pathinfo($data->model3D->getClientOriginalName(), PATHINFO_FILENAME). '_' . uniqid() . '.' . $data->model3D->getClientOriginalExtension();
            $data->model3D->move('../public/files/3Dmodels',$modelFileName);
            $pokemon->setModel3D($modelFileName);
        }
        $this->pokemonRepository->save($pokemon, true);
        return $pokemon;
    }
}


import Pokemon from "../types/Pokemon";

const eevee : Pokemon = {
    id: 1,
    name: 'Eevee',
    image: './src/assets/images/eevee.png',
    score: 89,
    power: 100,
    spawn: 100,
    background: './src/assets/images/backgroundpink.jpg',
    description: 'Eevee has an unstable genetic makeup that suddenly mutates due to the environment in which it lives. Radiation from various stones causes this Pokémon to evolve.'
}
const bulbasaur : Pokemon = {
    id: 2,
    name: 'Bulbasaur',
    image: './src/assets/images/bulbasaur.png',
    score: 89,
    power: 100,
    spawn: 100,
    background: './src/assets/images/backgroundgreen.jpg',
    description: 'Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun\'s rays, the seed grows progressively larger.'
}
const charizard : Pokemon = {
    id: 3,
    name: 'Charizard',
    image: './src/assets/images/charizard.png', 
    score: 89,
    power: 100,
    spawn: 100,
    background: './src/assets/images/backgroundred.avif',
    description: 'Charizard flies around the sky in search of powerful opponents. It breathes fire of such most wondrous heat yond \'t melts aught. However, it never turns its fiery breath on any opponent weaker than itself.'
}
const rowlet : Pokemon = {
    id: 4,
    name: 'Rowlet',
    image: './src/assets/images/rowlet.png',
    score: 89,
    power: 100,
    spawn: 1,
    background: './src/assets/images/backgroundbeige.jpg',
    description : 'Rowlet is a small, avian Pokémon with a round body and a short, stubby tail. It has a small, round head with a large, round, black eye on each side. It has a small, round beak with a black tip. It has two small, round wings with a black tip on each wing. It has two small, round legs with three toes on each foot. It has a small, round, black tail with a white tip.'
}
const pokemons : Pokemon[] = [eevee, bulbasaur, charizard, rowlet];
export default pokemons;
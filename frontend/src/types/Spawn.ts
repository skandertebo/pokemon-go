import { Entity } from '.';
import Pokemon from './Pokemon';
import User from './User';

export interface Spawn extends Entity {
  id: number;
  radius: number; // the range of the area where the character becomes catchable
  spawnDate: Date; // the time when the character spawns ( timestamp )
  longitude: number; // the longitude of the spawn
  latitude: number; // the latitude of the spawns
  pokemon: Pokemon;
  owner: User;
  captureDate: Date;
}

import { Entity } from '.';

export interface Spawn extends Entity {
  characterId: number;
  range: number; // the range of the area where the character becomes catchable
  spawnRate: number; // the spawn rate of the character
  spawnTime: number; // the time when the character spawns ( timestamp )
  longitude: number; // the longitude of the spawn
  latitude: number; // the latitude of the spawn
}

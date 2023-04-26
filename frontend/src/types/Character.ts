// this represent a pokemon but we make it generic if we want to use it for other things
import { Entity } from '.';

export interface Character extends Entity {
  nom: string;
  model3d: string;
  image: string;
  description: string;
  baseScore: number;
}

import { apiBaseUrl } from "../config";

export default function shoudDisplayDefaultImage(
  imageUrl: string | null | undefined
): boolean {
  if (!imageUrl || imageUrl === '_'||imageUrl===apiBaseUrl+'/public/image/' ) return true;
  return false;
}

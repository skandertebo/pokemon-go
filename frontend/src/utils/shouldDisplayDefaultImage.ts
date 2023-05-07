export default function shoudDisplayDefaultImage(
  imageUrl: string | null | undefined
): boolean {
  if (!imageUrl || imageUrl == '_') return true;
  return true;
}

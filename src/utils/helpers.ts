export function emify(sizeValue: number, aspectRatio?: number): string {
  return (aspectRatio ? sizeValue * aspectRatio : sizeValue) + "em";
}
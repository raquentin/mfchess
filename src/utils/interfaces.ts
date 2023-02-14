/*
 * SVGProps is implemented by SVG tsx components to allow dynamic width and color (see assets/*.tsx)
 * @param width: number
 * @param color: number
*/
export interface SVGProps {
  width: number,
  color?: string
}
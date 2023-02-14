/*
 * SVGProps is implemented by SVG tsx components to allow dynamic width and color (see assets/*.tsx)
 * @prop width: number
 * @prop color: number
*/
export interface SVGProps {
  width: number,
  color?: string
}
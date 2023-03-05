import { ThemedStyledProps } from "styled-components";

/*
 * SVGProps is implemented by SVG tsx components to allow dynamic width and color (see assets/*.tsx)
 @prop width: number
 @prop color: number
*/
export interface SVGProps {
  width: number,
  color?: string,
  isBlack?: boolean
}

export interface MoveType {
  from: string,
  to: string,
  promotion: string,
}

export interface SocketMoveType {
  fen: string,
  color: string,
  piece: string,
  from: string,
  to: string,
  san: string,
  lan: string,
  flags: string,
}
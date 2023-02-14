//* import local
import { SVGProps } from "utils/interfaces";
import { emify } from "utils/helpers";

const LogoSVG = ({width, color}: SVGProps): JSX.Element => { //* LogoSVG is a functional component that takes in a width and a color value that adheres to the SVGProps interface and returns a JSX.Element
  const ASPECT_RATIO = (859/471); //* original height / original width (see viewBox value)
  const RECT_WIDTH_RATIO = (35/859); //* original width of square gem on mask / original width (see <rect />)
  const STROKE_RATIO = (30/859); //* original stroke value / original width (see end of every <path />)

  return (
    <svg width={width} height={emify(width, ASPECT_RATIO)} viewBox="0 0 471 859" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M450.53 815C392.029 833.5 221.03 868 25.5295 815C21.5295 800.167 25.5295 760 65.0295 747.5C44.6963 726.667 25.5295 684 94.5297 645C94.5297 645 118.53 539.5 124.53 498L234.53 306.5L344.03 492.5C366.43 558.5 381.53 645 381.53 645C454.03 678.5 435.53 730 418.53 747.5C464.53 780.5 455.696 803.667 450.53 815Z" fill="#333333"/>
      <path d="M65.0295 747.5C25.5295 760 21.5295 800.167 25.5295 815C221.03 868 392.029 833.5 450.53 815C455.696 803.667 464.53 780.5 418.53 747.5M65.0295 747.5C65.0295 747.5 200.03 812 418.53 747.5M65.0295 747.5C44.6963 726.667 25.5295 684 94.5297 645C94.5297 645 118.53 539.5 124.53 498L234.53 306.5L344.03 492.5C366.43 558.5 381.53 645 381.53 645C454.03 678.5 435.53 730 418.53 747.5" stroke="black" stroke-width={emify(width * STROKE_RATIO)}/>
      <path d="M141.53 576.5C141.53 576.5 127.863 528 124.53 498L114.03 411L65.0296 373L51.0298 321.5C46.0298 312.5 36.0298 301 36.0297 250C36.0297 240 3.95494 228.5 19.0297 228.5C36.0298 228.5 42.0297 213.5 42.0297 213.5C48.3631 192.333 74.5839 157.041 87.5297 137.5C114.03 97.5 195.53 73 237.03 25C271.53 75.5 381.53 119.65 392.03 137.5C407.03 163 432.83 198.5 432.03 220.5C432.03 220.5 435.53 234 453.03 234C462.249 234 447.03 243 439.03 250C431.03 257 445.03 289.5 418.53 321.5L406.03 373L358.53 411L344.03 492.5L337.03 576.5C301.43 589.7 263.53 576.5 263.53 576.5L267.53 505.25L271.53 434H199.03L206.03 576.5C194.83 585.7 158.363 580.333 141.53 576.5Z" fill="white" stroke="black" stroke-width={emify(width * STROKE_RATIO)}/>
      <path d="M206.03 250H94.5298C88.8632 273.833 87.5298 310 154.53 310C216.813 310 214.53 266.167 206.03 250Z" fill="black" stroke="black" stroke-width={emify(width * STROKE_RATIO)}/>
      <path d="M375.03 250H263.53C257.863 273.833 256.53 310 323.53 310C385.813 310 383.53 266.167 375.03 250Z" fill="black" stroke="black" stroke-width={emify(width * STROKE_RATIO)}/>
      <rect x="210.925" y="104.708" width={emify(width, RECT_WIDTH_RATIO)} height={emify(width, RECT_WIDTH_RATIO)} transform="rotate(-44 210.925 104.708)" fill={color} stroke="black" stroke-width={emify(STROKE_RATIO / 2)}/>
    </svg>

  );
}

export default LogoSVG;
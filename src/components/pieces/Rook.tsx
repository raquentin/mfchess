import { SVGProps } from "utils/interfaces";

const Rook = ({width, isBlack}: SVGProps): JSX.Element => {
  if (isBlack) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 45 45">
        <g
          style={{
            opacity: 1,
            fill: "#000",
            fillOpacity: 1,
            fillRule: "evenodd",
            stroke: "#000",
            strokeWidth: 1.5,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
        >
          <path
            d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z"
            style={{
              strokeLinecap: "butt",
            }}
            transform="translate(0 .3)"
          />
          <path
            d="M14 29.5v-13h17v13H14z"
            style={{
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
            }}
            transform="translate(0 .3)"
          />
          <path
            d="M14 16.5 11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z"
            style={{
              strokeLinecap: "butt",
            }}
            transform="translate(0 .3)"
          />
          <path
            d="M12 35.5h21M13 31.5h19M14 29.5h17M14 16.5h17M11 14h23"
            style={{
              fill: "none",
              stroke: "#fff",
              strokeWidth: 1,
              strokeLinejoin: "miter",
            }}
            transform="translate(0 .3)"
          />
        </g>
      </svg>
    )
  } else {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width} viewBox="0 0 45 45">
        <g
          style={{
            opacity: 1,
            fill: "#fff",
            fillOpacity: 1,
            fillRule: "evenodd",
            stroke: "#000",
            strokeWidth: 1.5,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
        >
          <path
            d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5"
            style={{
              strokeLinecap: "butt",
            }}
            transform="translate(0 .3)"
          />
          <path d="m34 14.3-3 3H14l-3-3" />
          <path
            d="M31 17v12.5H14V17"
            style={{
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
            }}
            transform="translate(0 .3)"
          />
          <path d="m31 29.8 1.5 2.5h-20l1.5-2.5" />
          <path
            d="M11 14h23"
            style={{
              fill: "none",
              stroke: "#000",
              strokeLinejoin: "miter",
            }}
            transform="translate(0 .3)"
          />
        </g>
      </svg>
    )
  }
}

export default Rook;
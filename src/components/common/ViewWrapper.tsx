//* import third-party deps
import { ReactNode, useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

//* import local
import ThemeColorContext from "context/colorContext";

interface ViewWrapperProps {
  children?: ReactNode; //* props of containers must be ReactNodes
}

/*
 * ViewWrapper contains the page transition logic for RouteViews like IndexView and ProfileView
 * @prop children: ViewWrapperProps = ReactNode (a page like IndexView)
 * @context themeColor: string = the hexcode string for the global theme color
 * @returns JSX.Element the child(ren) route page wrapped in page transition logic
*/
const ViewWrapper = ({ children }: ViewWrapperProps): JSX.Element => {
  //* component logic
  const themeColor = useContext(ThemeColorContext);

  //* styled-components
  const MotionContainer = styled(motion.div)`
    min-height: 100vh;
    max-width: 100%;
    background-color: ${themeColor};
  `;

  //* render
  return (
    <MotionContainer
      initial={{ opacity: 0.0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.0 }}
    >
      {children}
    </MotionContainer>
  );
}

export default ViewWrapper;
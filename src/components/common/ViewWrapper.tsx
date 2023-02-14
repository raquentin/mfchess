//* import third-party deps
import { ReactNode, useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

//* import local
import ThemeColorContext from "context/colorContext";
import Nav from "./nav/NavView";

interface ViewWrapperProps {
  children: ReactNode; //* props of containers must be ReactNodes
  hasNavbar?: boolean; //* whether to render navbar and setup container for children (undefined by default does not trigger conditional)
  backgroundColor?: string; //* optional explicit background color. themeColor is implicit
}

/*
 * ViewWrapper contains the page transition logic for RouteViews like IndexView and ProfileView
 @prop children: ViewWrapperProps = ReactNode (a page like IndexView)
 @prop backgroundColor?: string = an optional explicit background color to override theme color
 @context themeColor: string = the hexcode string for the global theme color
 @returns JSX.Element the child(ren) route page wrapped in page transition logic
*/
const ViewWrapper = ({ children, hasNavbar, backgroundColor }: ViewWrapperProps): JSX.Element => {
  //* component logic
  const themeColor = useContext(ThemeColorContext);

  if (hasNavbar) {
    return (
      <MotionContainerWithNavbar
        backgroundColor={backgroundColor ? backgroundColor : themeColor}
        initial={{ opacity: 0.0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.0 }}
      >
        <Nav/>
        <ContentContainer>
          {children}
        </ContentContainer>
      </MotionContainerWithNavbar>
    );
  } else {
    return (
      <MotionContainerWithoutNavbar
        backgroundColor={backgroundColor ? backgroundColor : themeColor}
        initial={{ opacity: 0.0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.0 }}
      >
        {children}
      </MotionContainerWithoutNavbar>
    );
  }
}

export default ViewWrapper;

//lines below this point are styled-components logic

/*
 * MotionContainerWithoutNavbar extends the motion.div while making it take the entire screen
*/
const MotionContainerWithoutNavbar = styled(motion.div)< { backgroundColor: string }>`
  min-height: 100vh;
  max-width: 100%;
  background-color: ${props => props.backgroundColor};
`;

/*
 * MotionContainerWithNavbar extends the motion.div while making it take the entire screen
*/
const MotionContainerWithNavbar = styled(motion.div)< { backgroundColor: string }>`
  min-height: 100vh;
  max-width: 100%;
  background-color: ${props => props.backgroundColor};
  display: flex;
`;

/*
 * ContentContainer holds the right side of the screen when a navbar is used and enforces safezone (padding)
 ! min-width and max-width are hardcoded and depend on the width of the navbar. see components/common/nav/NavView.tsx for more info
 TODO: write a jest test to ensure the widths add upp to the window width
*/
const ContentContainer = styled(motion.div)`
  min-height: calc(100% - 5em);
  max-height: calc(100% - 5em);
  min-width: calc(100% - 5em - 5.5em); 
  max-width: calc(100% - 5em - 5.5em);
  padding: 2.5em;

  // * uncomment to see div's bounds explicity in green
  //// padding: 0em !important;
  //// margin: 2.5em;
  //// background-color: green;
`;
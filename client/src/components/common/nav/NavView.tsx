//* import third-party deps
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//* import local
import ThemeColorContext from "context/colorContext";
import LogoPNG from "assets/logo.png";
import PlayButtonSVG from "assets/playbutton.svg";
import ProfileButtonSVG from "assets/profilebutton.jpg";


/*
 * NavView is the parent nav component
 @context themeColor: string = the hexcode string for the global theme color
 @returns JSX.Element the navbar jsx component
*/
const NavView = (): JSX.Element => {
  //* component logic
  const themeColor = useContext(ThemeColorContext);

  //* render
  return (
    <NavContainer>
      <LogoButton to="/" backgroundColor={themeColor}>
        <LogoImage src={LogoPNG}/>
      </LogoButton>
      <PlayButton to="/game" backgroundColor={themeColor}>
        <PlayButtonImage src={PlayButtonSVG} />
      </PlayButton>
      <PlayButton to="/profile" backgroundColor={themeColor}>
        <PlayButtonImage src={ProfileButtonSVG} />
      </PlayButton>
    </NavContainer>
  );
}

export default NavView;

//lines below this point are styled-components logic

/*
 * NavContainer extends the motion.div while making it take the entire screen
 ! some width values for ViewWrapper rely on a hardcoded reference to the NavContainer's width. you may not change one without the other.
 TODO: write a jest test to ensure the widths add upp to the window width
*/
const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  height: 100vh;
  width: 5.5em;
  background-color: #222222;
`;


const LogoButton = styled(Link)<{backgroundColor: string}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 15%;
  gap: 2em;
  background-color: ${props => props.backgroundColor};
  
  transition: all 0.3s ease;
  &:hover {
    background-color: #888888;
  }
`;


const LogoImage = styled.img`
  display: flex; //? needed?
  width: 3.5em;
`;


const PlayButton = styled(Link)<{backgroundColor: string}>`
  width: 100%;
  aspect-ratio: 1;
  background-color: ${props => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s ease;
  &:hover {
    background-color: #888888;
  }
`;

const PlayButtonImage = styled.img`
  width: 75%;
`;
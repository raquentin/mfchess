//* import third-party deps
import { Link } from "react-router-dom";
import styled from "styled-components";

//* import local
import ViewWrapper from "components/common/ViewWrapper";
import LogoPNG from "assets/logo.png";

/*
 * IndexView is the head component for the index page (mfchess.com/)
 @returns JSX.element jsx structure for the index page
*/
const IndexView = (): JSX.Element => {
  //* render
  return (
    <ViewWrapper> {/** holds animation and container logic*/}
      <PageContainer>
        <LogoImage src={LogoPNG} />  
        <RightSideContent>
          <TitleText>mfChess</TitleText>
          <PlayButton to="/profile">PLAY</PlayButton>

          {/* !Temporary for testing */}
          <PlayButton to="/login">LOGIN</PlayButton>
        </RightSideContent>
      </PageContainer>
    </ViewWrapper>
  );
}

export default IndexView;

//lines below this point are styled-components logic

/*
 * PageContainer is the flexbox that wraps the two sides of the screen
*/
const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

/*
 * Logo is the mfChess logo on the left
*/
const LogoImage = styled.img`
  height: 60vh;
`;

/*
 * RightSideContainer is the flexbox on the right that aligns the mfChess title and the play button
*/
const RightSideContent = styled.div`
  display: flex;
  gap: 2em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/*
 * TitleText is the mfChess title
*/
const TitleText = styled.h1`
  color: white;
  font-size: 10em;
  font-weight: 800;
  margin: 0;
`;

/*
 * PlayButton is the play button that extends the react-router-dom Link component
 TODO: make the hover effect better
*/
const PlayButton = styled(Link)`
  background-color: black;
  color: white;
  font-size: 3em;
  font-weight: 800;
  text-decoration: none;
  padding: 0.5em 2em;

  transition: all 0.8s ease;
  &:hover {
    background-color: grey;
  }
`;
//* import third-party deps
import { Link } from "react-router-dom";
import styled from "styled-components";

//* import local
import ViewWrapper from "components/common/ViewWrapper";
import LogoPNG from "assets/logo.png";
import { useUser } from "context/UserContext";

/*
 * IndexView is the head component for the index page (mfchess.com/)
 @returns JSX.element jsx structure for the index page
*/
const IndexView = (): JSX.Element => {
  const [user, ,] = useUser();

  console.log("User: ", user);

  //* render
  return (
    <ViewWrapper> {/** holds animation and container logic*/}
      <PageContainer>
        <LogoImage src={LogoPNG} />
        <RightSideContainer>
          <TitleText>mfChess</TitleText>
          <ButtonContainer>
            <PlayButton to="/game">play</PlayButton>
            <PlayButton to="/login">login</PlayButton>
            {/* <PlayButton to="/chatroom">chatroom</PlayButton> */}
          </ButtonContainer>
        </RightSideContainer>
      </PageContainer>
    </ViewWrapper>
  );
}

export default IndexView;

//lines below this point are styled-components logic

/*
 * PageContainer is the flexbox that wraps the two sides of the screen
*/
export const PageContainer = styled.div`
  width: 100%;
  height: 97vh;
  gap: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/*
 * ContentRow is the flexbox that wraps the two sides of the screen
*/
export const ContentRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5em;
  align-items: center;
`;

/*
 * Logo is the mfChess logo on the left
*/
export const LogoImage = styled.img`
  height: 40vh;
`;

/*
 * RightSideContainer is the flexbox on the right that aligns the mfChess title and the play button
*/
export const RightSideContainer = styled.div`
  display: flex;
  gap: 2em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/*
 * TitleText is the mfChess title
*/
export const TitleText = styled.h1`
  color: white;
  font-size: 10em;
  font-weight: 800;
  margin: 0;
`;

/*
 * ButtonContainer is the flexbox on the right that aligns the mfChess title and the play button
*/
export const ButtonContainer = styled.div`
  display: flex;
  gap: 2em;
  align-items: center;
  justify-content: center;
`;

/*
 * PlayButton is the play button that extends the react-router-dom Link component
 TODO: make the hover effect better
*/
export const PlayButton = styled(Link)`
  background-color: #333333;
  border: 0.22em solid black;
  border-radius: 14px;
  color: white;
  font-size: 3em;
  font-weight: 800;
  text-decoration: none;
  padding: 0.25em 0.5em;

  transition: all 0.3s ease;
  &:hover {
    background-color: #287485;
  }
`;
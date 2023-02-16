//* import third-party deps
import styled from "styled-components";

//* import local
import ViewWrapper from "components/common/ViewWrapper";
/*
 * GameView is the head component for the game page (mfchess.com/game/{gameID}, or mrchess.com/game for now)
 @returns JSX.element jsx structure for the profile page
*/
const GameView = (): JSX.Element => {
  //* render
  return (
    <ViewWrapper backgroundColor={"#333333"} hasNavbar> {/** holds animation and container logic*/}
      <PlaceholderText>Game</PlaceholderText>
    </ViewWrapper>
    );
}

export default GameView;

//lines below this point are styled-components logic

const PlaceholderText = styled.p`
  font-size: 2em;
  color: white;
  font-weight: 500;
`;
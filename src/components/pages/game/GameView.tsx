//* import third-party deps
import styled from "styled-components";
import { Chessboard } from "react-chessboard";
import InGameProfile from "components/common/InGameProfile";

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
      <GameContainer>
        <ChessBoardContainer>
          <div>
            <Chessboard />
          </div>
        </ChessBoardContainer>
        <PlayerContainer>
          <InGameProfile userID={1} side="black" ></InGameProfile>
          <InGameProfile userID={2} side="white" ></InGameProfile>
        </PlayerContainer>
        <MoveContainer>
        </MoveContainer>
      </GameContainer>
    </ViewWrapper>
    );
}

export default GameView;

//lines below this point are styled-components logic
const GameContainer = styled.div`
  display: grid;
  grid-template-rows: 0.7fr 1fr;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;
const PlayerContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
  @media (max-width: 1000px) {
    height: 100px;
    width: 100px;
  }
`;
const MoveContainer = styled.div`
  background-color: #287485;;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  @media (max-width: 1000px) {
    height: 100px;
    width: 100px;
  }
`;
const PlaceholderText = styled.p`
  font-size: 2em;
  color: white;
  font-weight: 500;
  margin 16px;
`;

const ChessBoardContainer = styled.div`
  height: 95%;
  width: 95%;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;

const ButtonContainer = styled.div`
  height: 95%;
  width: 95%;
  background-color: black;
`;
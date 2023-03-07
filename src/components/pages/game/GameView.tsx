//* import third-party deps
import styled from "styled-components";
import { useState } from "react";
import { Chessboard } from "react-chessboard";

//* import local
import ViewWrapper from "components/common/ViewWrapper";
import GameInformation from "components/common/GameInformation";
import { MoveType } from "utils/interfaces";
import InGameProfile from "components/common/InGameProfile";
import { statusEnum, statusNumToDescription, useGame } from "context/WebSocket";
import { useUser } from "context/UserContext";
/*
 * GameView is the head component for the game page (mfchess.com/game/{gameID}, or mrchess.com/game for now)
 @returns JSX.element jsx structure for the profile page
*/


const GameView = (): JSX.Element => {
  const [user, ,] = useUser()
  // const [game, setGame] = useState(new Chess());
  const [startGame, setStartGame] = useState(false);
  const [isConnected, status, , color, chess, opponent, sendMessage, makeMove, clearLocalStorage] = useGame()
  const orientation = color === 'w' ? "white" : "black";

  if (user && user.loggedIn) {
    if (isConnected) {
      if (status === statusEnum.Connected) {
        console.log("HHHHAAA")
        sendMessage({
            type: "upgrade status",
            payload: {
                name: "authentication",
                userID: "",
                data: user.jwtCredential,
            }
        })
      }
    }
    /**
     * * This doesn't necessary need to be automatic, like in the future there might be options
     * * to join different games and stuff. But for now it will be automatic
     */
    // if (status === statusEnum.Authenticated) {
    //     sendMessage({
    //         type: "upgrade status",
    //         payload: {
    //             name: "pairing",
    //             userID: "",
    //             data: "",
    //         }
    //     })
    // }
  }


  const makeAMove = (move: MoveType) => {
    console.log("mackmo", startGame, chess.turn(), color)
    if(startGame === false) {
      return null;
    }
    if (chess.turn() !== color) return false
    return makeMove(move)
  }

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    // illegal move
    if (move === null) return false;
    return true;
  }


  //* render
  return (
    <ViewWrapper backgroundColor={"#333333"} hasNavbar> {/** holds animation and container logic*/}
      <GameContainer>
        <ChessBoardContainer>
          <div>
            <Chessboard position={chess.fen()} onPieceDrop={onDrop} boardOrientation={orientation}/>
          </div>
        </ChessBoardContainer>
        {status === statusEnum.Paired ? 
                <>
                    <PlayerContainer>
                      <InGameProfile userID={1} side="black" startedGame={startGame} isTurn={(chess.turn() === 'b')} player={user!} ></InGameProfile>
                      <InGameProfile userID={2} side="white" startedGame={startGame} isTurn={(chess.turn() === 'w')} player={opponent}></InGameProfile>
                    </PlayerContainer>
                    <InfoContainer>
                      {startGame ? <GameInformation></GameInformation> : <PlayButton onClick={() => setStartGame(true)} >Play</PlayButton>}
                    </InfoContainer>
                </>
                : <StatusText>Status: {statusNumToDescription.get(status)}</StatusText> 
        }
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
    width: 95%;
    height: 250px;
  }
`;
const InfoContainer = styled.div`
  background-color: #287485;;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1000px) {
    width: 95%;
    height: 250px;
  }
`;
// const PlaceholderText = styled.p`
//   font-size: 2em;
//   color: white;
//   font-weight: 500;
//   margin 16px;
// `;

const ChessBoardContainer = styled.div`
  height: 95%;
  width: 95%;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;

// const ButtonContainer = styled.div`
//   height: 95%;
//   width: 95%;
//   background-color: black;
// `;

const PlayButton = styled.button`
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


export const StatusText = styled.h1`
  color: #EFC050;
  font-size: 2em;
  font-weight: 800;
  margin: 0;
`;
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

  // console.log("GGGG", user, isConnected)
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
    // console.log("mackmo", startGame, chess.turn(), color)
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
  const queueButtonOnClick = () => {
    console.log("SSSTATUS:", status)
    if (status >= statusEnum.Authenticated) {
      sendMessage({
        type: "upgrade status",
        payload: {
            name: "joinRoom",
            userID: "",
            data: "",
        }
      })
      setStartGame(true)
    } else {
      alert("Not connected or not authenticated")
    }
  }

  //* render
  //? why is there an intermediate div between the chessboard and its container
  return (
    <ViewWrapper backgroundColor={"#333333"} hasNavbar> {/** holds animation and container logic*/}
      <GameContainer>
        <ChessBoardContainer>
          <div>
            <Chessboard position={chess.fen()} onPieceDrop={onDrop} boardOrientation={orientation}
            customLightSquareStyle={{backgroundColor: '#DCDCDC'}} customDarkSquareStyle={{backgroundColor: "#287485"}}/>
          </div>
        </ChessBoardContainer>
        {(true || status === statusEnum.Paired)
          ? (
              <NonBoardPart>
                <PlayerContainer>
                  <InGameProfile userID={1} side="black" startedGame={startGame}
                    isTurn={(chess.turn() === 'b')} player={user!}/>
                  <InGameProfile userID={2} side="white" startedGame={startGame}
                    isTurn={(chess.turn() === 'w')} player={opponent}/>
                </PlayerContainer>
                <InfoContainer>
                  {startGame ? <GameInformation></GameInformation> : <PlayButton onClick={queueButtonOnClick} >queue for 5+0</PlayButton>}
                </InfoContainer>
              </NonBoardPart>
          )       
          : (
            <StatusText>Status: {statusNumToDescription.get(status)}</StatusText>
          )
        }
      </GameContainer>
    </ViewWrapper>
    );
}

export default GameView;

//lines below this point are styled-components logic
const GameContainer = styled.div`
  gap: 2em;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NonBoardPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  height: 88vh;
  width: 100%;
  justify-content: space-between;
  align-content: center;
`;
const PlayerContainer = styled.div`
  display: flex;
  gap: 2em;
  justify-content: space-between;
  align-content: center;
`;
const InfoContainer = styled.div`
  background-color: #287485;
  display: flex;
  height: 100%;
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
  min-width: 88vh;
`;

// const ButtonContainer = styled.div`
//   height: 95%;
//   width: 95%;
//   background-color: black;
// `;

const PlayButton = styled.div`
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


export const StatusText = styled.h1`
  color: #EFC050;
  font-size: 2em;
  font-weight: 800;
  margin: 0;
`;

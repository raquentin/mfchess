import { SetStateAction, useState } from "react";
import {useUser} from "../context/UserContext";
import styled from "styled-components";
import Payload from "./Payload";
import { statusEnum, statusNumToDescription, useGame } from "../context/WebSocket";




const ChatRoom: React.FunctionComponent = ()  => {
  const [user, updateUser, fetchUser] = useUser()
  const [inputText, setInputText] = useState<string>('');
  const [isConnected, status, messages, color, chess,, sendMessage, makeMove] = useGame()


  // if (user && user.loggedIn) {
  //   if (status === statusEnum.Connected) {
  //       sendMessage({
  //           type: "upgrade status",
  //           payload: {
  //               name: "authentication",
  //               userID: "",
  //               data: user.jwtCredential,
  //           }
  //       })
  //   }
  //   /**
  //    * * This doesn't necessary need to be automatic, like in the future there might be options
  //    * * to join different games and stuff. But for now it will be automatic
  //    */
  //   // if (status === statusEnum.Authenticated) {
  //   //     sendMessage({
  //   //         type: "upgrade status",
  //   //         payload: {
  //   //             name: "pairing",
  //   //             userID: "",
  //   //             data: "",
  //   //         }
  //   //     })
  //   // }
  // }
  
  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = () => {
    if (!user) throw new Error("User undefined.")
    if (!user.loggedIn) throw new Error("User not logged in.")
    sendMessage({
        type: "chat",
        payload: {
          name: user.name,
          userID: user.userID,
          data: inputText,
        }
    });
    setInputText("")
  };



  /**
   * TODO make it automatically align to bottom of messages
   */
  return (
    <>
      {status === statusEnum.Paired ? 
      <>
          <MessageListColumn>
          {messages.map((payload, idx) => {
              return <Payload key={idx} payload={payload}></Payload>
          })}
          </MessageListColumn>
          <ButtonBox>
            <TypeBox type="text" value={inputText} onChange={handleInputChange} />
            <SendBtn onClick={handleButtonClick}> send </SendBtn>
          </ButtonBox>

      </>
      : <StatusText>Status: {statusNumToDescription.get(status)}</StatusText> 
      } 
    </>
  );
}

export default ChatRoom;

export const StatusText = styled.h1`
  color: #EFC050;
  font-size: 2em;
  font-weight: 800;
  margin: 0;
`;

const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 1em;
    height: 15%;
    background-color: #287485;
`;

const TypeBox = styled.input`
    background-color: #D2d2d2;
    border: none;
    outline: none;
    width: 70%;
    padding: 0em 0.8em;
    height: 3em;
    border-radius: 5px;
    font-size: 16px;
    color: black;
    font-weight: bold;
`;

const SendBtn = styled.div`
  border: 0.22em solid black;
  height: 1em;
  align-items: center;
  border-radius: 14px;
  color: white;
  font-size: 1.7em;
  font-weight: 800;
  text-decoration: none;
  padding: 0.1em 0.3em 0.2em 0.3em;
    cursor: pointer;

  transition: all 0.3s ease;
  &:hover {
    background-color: #222222;
  }
`;

const MessageListColumn = styled.div`
  overflow: auto;
  padding-top: 3rem;
  height: 85%;
  background-color: #287485;
  border-bottom: 0.2em solid #222222;
  padding: 0.4em 1em;
  box-sizing: border-box;
`
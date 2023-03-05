import { SetStateAction, useState } from "react";
import {useUser} from "../context/UserContext";
import styled from "styled-components";
import Payload from "./Payload";
import { statusEnum, statusNumToDescription, useGame } from "../context/WebSocket";




const ChatRoom: React.FunctionComponent = ()  => {
  const [user, updateUser, fetchUser] = useUser()
  const [inputText, setInputText] = useState<string>('');
  const [status, messages, color, chess, sendMessage, makeMove] = useGame()


  if (user && user.loggedIn) {
    if (status === statusEnum.Connected) {
        sendMessage({
            type: "upgrade status",
            payload: {
                name: "authentication",
                userID: "",
                data: user.jwtCredential,
            }
        })
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
          <input type="text" value={inputText} onChange={handleInputChange} />
          <button onClick={handleButtonClick}> send </button>
          <MessageListColumn>
          {messages.map((payload, idx) => {
              return <Payload key={idx} payload={payload}></Payload>
          })}
          </MessageListColumn>
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

const MessageListColumn = styled.div`
  overflow: auto;
  padding-top: 3rem;
  background-color: #f8f9fa;
  box-sizing: border-box;
  border: 1px solid #dee2e6;
  height: 200px;
  width: 500px;
`
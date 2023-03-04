import { SetStateAction, useState } from "react";
import {useUser} from "../context/UserContext";
import {MessageType, PayloadType} from "../types/MessageType"
import styled from "styled-components";
import ViewWrapper from "./common/ViewWrapper";
import { PageContainer, PlayButton, RightSideContent, TitleText } from "./pages/index/IndexView";
import Payload from "./Payload";

const ws: WebSocket = new WebSocket('ws://localhost:4000')

ws.onopen = () => {
    console.log("connected")
}

const sendMessage = (message: MessageType) => {
    ws.send(JSON.stringify(message));
}

// * According to level, the larger the better
const statusEnum = {
    Stop: -1,
    Disconnected: 0,
    Connected: 1,
    Authenticated: 2,
    InQueue: 3,
    Paired: 4,
}

// ! stupid solution, please help
const statusNumToDescription = new Map<number, string>([
    [-1, "Error, likely caused by duplicate logins"],
    [0, "Disconnected from server"],
    [1, "Connected to server, but not logged in"],
    [2, "Authenticated by server"],
    [3, "Waiting for opponent"],
    [4, "Paired with opponent"],
]);



const ChatRoom: React.FunctionComponent = ()  => {
  const [user, updateUser, fetchUser] = useUser()
  const [inputText, setInputText] = useState<string>('');
  const [status, setStatus] = useState<number>(statusEnum.Connected);
  const [messages, setMessages] = useState<PayloadType[]>([])

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

  ws.onmessage = (byteString) => {
    const {type, payload} = JSON.parse(byteString.data);
    switch (type) {
        case "chat":
            setMessages(messages => {
                const newmessage: PayloadType[] = [...messages, payload]
                return newmessage
            });
            break;
        case "status":
            if (!user) throw new Error("User undefined.")
            if (!user.loggedIn) throw new Error("User not logged in.")
            if (payload.name === "authentication request") {
                sendMessage({
                    type: "upgrade status",
                    payload: {
                      name: "authentication",
                      userID: "",
                      data: user.jwtCredential,
                    }
                })
            } else if (payload.name === "status update") {
                if (payload.data === "paired") {
                    console.log("Pairing Succeeded")
                    setStatus(status => {
                        if (status <= 3) return statusEnum.Paired
                        return status
                    })
                } else if (payload.data === "in queue") {
                    console.log("Waiting in queue")
                    setStatus(status => {
                        if (status <= 2) return statusEnum.InQueue
                        return status
                    })
                } else if (payload.data === "authenticated") {
                    console.log("Authentication Succeeded")
                    setStatus(status => {
                        if (status <= 1) return statusEnum.Authenticated
                        return status
                    })

                    /**
                     * * This doesn't necessary need to be automatic, like in the future there might be options
                     * * to join different games and stuff. But for now it will be automatic
                     */
                    sendMessage({
                        type: "upgrade status",
                        payload: {
                            name: "joinRoom",
                            userID: "",
                            data: "",
                        }
                    })
                } else if (payload.data === "connected") {
                    console.log("Authentication failed, retrying")

                    sendMessage({
                        type: "authentication",
                        payload: {
                        name: "",
                        userID: "",
                        data: user.jwtCredential,
                        }
                    })
                } else {
                    console.log("Irregular authentication failure from", payload.data)
                    setStatus(status => -1)
                }
            } else {
                throw new Error("Unknown message")
            }
            break;
    }
}

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
    <ViewWrapper> {/** holds animation and container logic*/}
    <PageContainer>
      <RightSideContent>
        <TitleText>ChatRoom</TitleText>
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
      <PlayButton to="/">MAIN</PlayButton>
      </RightSideContent>
    </PageContainer>
  </ViewWrapper>
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
import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useUser} from "../context/UserContext";
import {UserType} from "../types/UserType"
import {MessageType, PayloadType} from "../types/MessageType"
import styled from "styled-components";
import ViewWrapper from "./common/ViewWrapper";
import { PageContainer, PlayButton, RightSideContent, TitleText } from "./pages/index/IndexView";
import Payload from "./Payload";

// import sendMessage from "../components/common/ws"


const ws: WebSocket = new WebSocket('ws://localhost:4000')

ws.onopen = () => {
    console.log("connected")
}

const sendMessage = (message: MessageType) => {
    ws.send(JSON.stringify(message));
}

const ChatRoom: React.FunctionComponent = ()  => {
  const [user, updateUser, fetchUser] = useUser()
  if (user && user.loggedIn) {
    if (user?.socketStatus != "connected & authenticated") {
        sendMessage({
            type: "authentication",
            payload: {
            name: "",
            userID: "",
            data: user.jwtCredential,
            }
        })
    }
}
  const [inputText, setInputText] = useState<string>('');

  const [status, setStatus] = useState<string>('noAuth');

  const [messages, setMessages] = useState<PayloadType[]>([])
  
  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputText(event.target.value);
  };

  ws.onmessage = (byteString) => {
    const {type, payload} = JSON.parse(byteString.data);
    // console.log("received Message: ", type, payload)
    switch (type) {
        case "chat":
            // console.log(payload.name, "said", payload.data)
            setMessages(messages => {
                const newmessage: PayloadType[] = [...messages, payload]
                // console.log(newmessage)
                return newmessage
            });
            break;
        case "authentication":
            console.log("Being requested Auth")
            if (!user) throw new Error("User undefined.")
            if (!user.loggedIn) throw new Error("User not logged in.")
            if (payload.name == "request") {
                sendMessage({
                    type: "authentication",
                    payload: {
                      name: "",
                      userID: "",
                      data: user.jwtCredential,
                    }
                })
            } else if (payload.name == "result") {
                if (payload.data == "success") {
                    console.log("Authentication Succeeded")
                    updateUser!((user: UserType) => {
                        user.socketStatus = "connected & authenticated";
                        return user;
                    })
                } else if (payload.data == "retry") {
                    console.log("Authentication Failed, retrying")
                    sendMessage({
                        type: "authentication",
                        payload: {
                        name: "",
                        userID: "",
                        data: user.jwtCredential,
                        }
                    })
                } else {
                    console.log("Authentication Failed.")
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


  return (
    <ViewWrapper> {/** holds animation and container logic*/}
    <PageContainer>
      <RightSideContent>
        <TitleText>mfChess</TitleText>
        
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button onClick={handleButtonClick}> send </button>
        <MessageListColumn>
        {messages.map((payload, idx) => {
            return <Payload key={idx} payload={payload}></Payload>
        })}
        </MessageListColumn>
      <PlayButton to="/">MAIN</PlayButton>
      </RightSideContent>
    </PageContainer>
  </ViewWrapper>
  );
}

export default ChatRoom;

const MessageListColumn = styled.div`
  overflow: auto;
  padding-top: 3rem;
  background-color: #f8f9fa;
  box-sizing: border-box;
  border: 1px solid #dee2e6;
  height: 200px;
  width: 500px;
  absolute: bottom;
`
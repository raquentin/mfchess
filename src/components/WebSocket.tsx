import { useUser } from "context/UserContext";
import React, { useContext, useState } from "react"
import { MessageType, PayloadType } from "types/MessageType";


// * According to level, the larger the better
export const statusEnum = {
    Stop: -1,
    Disconnected: 0,
    Connected: 1,
    Authenticated: 2,
    InQueue: 3,
    Paired: 4,
}

// ! stupid solution, please help
export const statusNumToDescription = new Map<number, string>([
    [-1, "Error, likely caused by duplicate logins"],
    [0, "Disconnected from server"],
    [1, "Connected to server, but not logged in"],
    [2, "Authenticated by server"],
    [3, "Waiting for opponent"],
    [4, "Paired with opponent"],
]);

const ws: WebSocket = new WebSocket('ws://localhost:4000')

ws.onopen = () => {
    console.log("connected")
}
const sendMessage = (message: MessageType) => {
    ws.send(JSON.stringify(message));
}


type gameContextType = [number, 
                        PayloadType[],
                        ((message: MessageType) => void)]

const GameContext = React.createContext<gameContextType>([ 1, 
                                                           [], 
                                                           () => {}])

export const useGame = () => {
    return useContext(GameContext)
}

interface Props {
    children: React.ReactNode;
}
/**
 * * Function that Wraps the context into a JSX element to abstract useContext.
 */
export const GameProvider: React.FC<Props> = ({ children }) => {
    const [user, updateUser, fetchUser] = useUser()
    const [status, setStatus] = useState<number>(statusEnum.Connected);
    const [messages, setMessages] = useState<PayloadType[]>([])

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


    return (
        <GameContext.Provider 
            value={[
                status, 
                messages, 
                sendMessage]}>
            {children}
        </GameContext.Provider>
    )
}
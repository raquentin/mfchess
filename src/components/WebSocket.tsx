import { useUser } from "context/UserContext";
import React, { useContext, useState } from "react"
import { MessageType, PayloadType } from "types/MessageType";
import { MoveType, SocketMoveType } from "utils/interfaces";
import { Chess } from 'chess.js';


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
                        string,
                        Chess,
                        ((message: MessageType) => void),
                        ((move: MoveType) => void)]

const GameContext = React.createContext<gameContextType>([ 1,
                                                           [], 
                                                           "",
                                                           new Chess(),
                                                           () => {},
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
    const [user, ,] = useUser()
    const [status, setStatus] = useState<number>(statusEnum.Connected);
    const [messages, setMessages] = useState<PayloadType[]>([])
    const [color, setColor] = useState<string>("")
    const [chessGame, setChessGame] = useState(new Chess());

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
                if (!user) {
                    // throw new Error("User undefined.")
                    console.log("User undefined.")
                } else if (!user.loggedIn) {
                    // throw new Error("User not logged in.")
                    console.log("User not logged in.")
                } else if (payload.name === "authentication request") {
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
            case "game":
                if (payload.name === "start game") {
                    setColor(payload.data)
                } else if (payload.name === "move"){
                    const socketMove: SocketMoveType = JSON.parse(payload.data);
                    const chessGameCopy = new Chess(socketMove.fen);
                    setChessGame(chessGameCopy);
                }
                break;
            
        }
    }

    // * the lastMove is slightly different from the .history notation of chess.js, we use the fen string 
    // * of the board AFTER the move has been made.
    const makeMove = (move: MoveType) => {
        const chessGameCopy = new Chess(chessGame.fen());
        const result = chessGameCopy.move(move);
        setChessGame(chessGameCopy);
        if (result) {
            const history = chessGameCopy.history({ verbose: true })
            const lastMove: SocketMoveType = history[history.length - 1]
            lastMove.fen = chessGameCopy.fen()
            // console.log("Last:", lastMove)
            ws.send(JSON.stringify({
                type: "game",
                payload: {
                    name: "move",
                    userID: "",
                    data: JSON.stringify(lastMove),
                }
            }))
        }
    }

    return (
        <GameContext.Provider 
            value={[
                status, 
                messages, 
                color,
                chessGame,
                sendMessage,
                makeMove]}>
            {children}
        </GameContext.Provider>
    )
}
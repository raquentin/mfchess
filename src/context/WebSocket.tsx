import { defaultUser, useUser } from "context/UserContext";
import React, { useContext, useEffect, useState } from "react"
import { MessageType, PayloadType } from "types/MessageType";
import { MoveType, SocketMoveType } from "utils/interfaces";
import { Chess } from 'chess.js';
import { UserType } from "types/UserType";

const LOCALSTORAGE_CHESS_FEN = "save-chess-game";
const savedChessFENString = sessionStorage.getItem(LOCALSTORAGE_CHESS_FEN);
const savedChessFEN = savedChessFENString == null ? undefined : savedChessFENString

const LOCALSTORAGE_COLOR = "save-color";
const savedColor = sessionStorage.getItem(LOCALSTORAGE_COLOR);

const LOCALSTORAGE_MESSAGES = "save-messages";
const savedMessagesString = sessionStorage.getItem(LOCALSTORAGE_MESSAGES);
const savedMessages: null | PayloadType[] = savedMessagesString == null ? null : JSON.parse(savedMessagesString)

const LOCALSTORAGE_OPPONENT = "save-opponent";
const savedOpponentString = sessionStorage.getItem(LOCALSTORAGE_OPPONENT);
const savedOpponent: null | UserType = savedOpponentString == null ? null : JSON.parse(savedOpponentString)

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

// const ws: WebSocket = new WebSocket('wss://api.mfchess.com:8000');
const ws: WebSocket = new WebSocket('ws://localhost:4000');
console.log("NewSocket!!");



type gameContextType = [boolean,
                        number, 
                        PayloadType[],
                        string,
                        Chess,
                        UserType,
                        ((message: MessageType) => void),
                        ((move: MoveType) => void),
                        (() => void)]

const GameContext = React.createContext<gameContextType>([ false,
                                                           1,
                                                           [], 
                                                           "",
                                                           new Chess(),
                                                           defaultUser,
                                                           () => {},
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
    const [messages, setMessages] = useState<PayloadType[]>(savedMessages || [])
    const [color, setColor] = useState<string>(savedColor || "")
    const [chessGame, setChessGame] = useState(new Chess(savedChessFEN));
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [opponent, setOpponent] = useState<UserType>(savedOpponent || defaultUser)

    const clearLocalStorage = () => {
        sessionStorage.removeItem(LOCALSTORAGE_CHESS_FEN);
        sessionStorage.removeItem(LOCALSTORAGE_COLOR);
        sessionStorage.removeItem(LOCALSTORAGE_MESSAGES);
        sessionStorage.removeItem(LOCALSTORAGE_OPPONENT);
    }

    ws.onopen = () => {
        console.log("connected")
        setIsConnected(true)
    }
    const sendMessage = (message: MessageType) => {
        ws.send(JSON.stringify(message));
    }
    ws.onmessage = (byteString) => {
        const {type, payload} = JSON.parse(byteString.data);
        console.log("Hello", type, payload);
        switch (type) {
            case "chat":
                setMessages(messages => {
                    const newmessage: PayloadType[] = [...messages, payload]

                    sessionStorage.setItem(LOCALSTORAGE_MESSAGES, JSON.stringify(newmessage));
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
                        // fetchCurrentBoard (if not yet then server return start game message)
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
                    setOpponent(payload.userID) // * not an userID but actually UserType
                    sessionStorage.setItem(LOCALSTORAGE_OPPONENT, JSON.stringify(payload.userID));
                    
                    setColor(payload.data)
                    sessionStorage.setItem(LOCALSTORAGE_COLOR, payload.data);
                    
                    const newGame = new Chess()
                    setChessGame(newGame);
                    sessionStorage.setItem(LOCALSTORAGE_CHESS_FEN, newGame.fen());
                    
                    sessionStorage.deleteItem(LOCALSTORAGE_MESSAGES);


                } else if (payload.name === "move"){
                    const socketMove: SocketMoveType = JSON.parse(payload.data);
                    const chessGameCopy = new Chess(socketMove.fen);
                    setChessGame(chessGameCopy);
                    sessionStorage.setItem(LOCALSTORAGE_CHESS_FEN, chessGameCopy.fen());

                }
                break;
            
        }
    }

    // * the lastMove is slightly different from the .history notation of chess.js, we use the fen string 
    // * of the board AFTER the move has been made.
    const makeMove = (move: MoveType) => {
        console.log("Move:", move)
        const chessGameCopy = new Chess(chessGame.fen());
        const result = chessGameCopy.move(move);
        setChessGame(chessGameCopy);
        sessionStorage.setItem(LOCALSTORAGE_CHESS_FEN, chessGameCopy.fen());
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
                isConnected,
                status, 
                messages, 
                color,
                chessGame,
                opponent,
                sendMessage,
                makeMove,
                clearLocalStorage]}>
            {children}
        </GameContext.Provider>
    )
}

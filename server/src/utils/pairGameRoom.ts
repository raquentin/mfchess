import { WebSocket } from 'ws';
import { GameType } from '../models/Game';
import { RoomModel } from '../models/Room';
import { UserType } from '../models/Users';
import { RoomMapType, ServerUserType, WSInfo } from '../webSocketServer';

const roomIDLength = 6;

/**
 * ! Algorithm to be improved
 * * Currently looks sync but later on should add in timeouts to wait for better pairings, and when timeout is
 * * up, it returns the suboptimal pairing
 * @param queue 
 * @param rooms 
 * @param wsInfo 
 */
export const pairGameRoom = async (queue: string[], rooms: Map<string, RoomMapType>, 
                wsInfo: Map<WebSocket, WSInfo>, userToWS: Map<string, WebSocket>, userInfo: Map<string, ServerUserType>) => {
    while (queue.length >= 2) {
        const players: string[] = [queue[0], queue[1]]; // userID
        queue.splice(0, 2);

        // ? Not really sure if this is needed, it is just a neater ID, probably for users to type in to join room?
        const newRoomID = createNewRoomID(rooms)
        
        /**
         * * Don't confuse the server side "rooms" and the db side "room", server side is for quick access to
         * * websockets, while db side is for saving all messages and game moves in database.
         */

        // ! Perform checks, ex: whether there is still a ws for a user
        // if (!wsInfo.has(players[0]) || !wsInfo.has(players[1])) throw new Error("Can't find player");

        const game: GameType = {
            moves: [],
            result: "onGoing"
        }
        const room = new RoomModel({
            roomID: newRoomID,
            users: players.map((userID) => {
                return userInfo.get(userID)!.user
            }),
            messages:[],
            game: game
        })
        try {
            await room.save().then((res) => {
                console.log("Room saved:", res.roomID)
            })
        } catch (err) {
            console.log(err)
            throw new Error("error while saving room")
        }

        // ! Randomly deciding color
        const whitePlayerIndex = Math.floor(Math.random() * 2)

        rooms.set(newRoomID, {players, roomMongoID: room._id, whitePlayerIndex})
        players.forEach((userID) => {
            const ws: WebSocket = userToWS.get(userID)!
            userInfo.get(userID)!.roomID = newRoomID
            ws.send(JSON.stringify({
                type: "status",
                payload: {
                    name: "status update",
                    userID: "",
                    data: "paired",
                }
            }))
        })
        
        // * Sending out start game messages to assign color
        const playerUserID1 = players[whitePlayerIndex]
        const playerUserID2 = players[1-whitePlayerIndex]
        sendStartGame(playerUserID1, playerUserID2, "w", userToWS, userInfo)
        sendStartGame(playerUserID2, playerUserID1, "b", userToWS, userInfo)

        console.log(`Paired:", [${userInfo.get(players[0])!.name}] and [${userInfo.get(players[1])!.name}]`)
    }
    return {
        leftOver: queue.length
    }
}
const createNewRoomID = (rooms: Map<string, RoomMapType>) => {
    let roomID = createRandomString(roomIDLength);

    // ! Total number of rooms: 2176782336, should avoid having more than 80% of that
    while (rooms.has(roomID)) {
        roomID = createRandomString(roomIDLength);
    }
    return roomID;
}
const createRandomString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length));
    }
    return result;
}

const sendStartGame = (playerUserID: string, opponentUserID: string, color: string, 
                userToWS: Map<string, WebSocket>, userInfo: Map<string, ServerUserType>) => {
    const ws: WebSocket = userToWS.get(playerUserID)!
    const opponentInfo: ServerUserType = userInfo.get(opponentUserID)!
    ws.send(JSON.stringify({
        type: "game",
        payload: {
            name: "start game",
            userID: opponentInfo,
            data: color,
        }
    }))
}   

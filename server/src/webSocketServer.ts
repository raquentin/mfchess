import { WebSocket } from 'ws';
import jwt, { JwtPayload }  from "jsonwebtoken";
import { pairGameRoom } from './utils/pairGameRoom';
import { UserModel, UserType } from './models/Users';
import { MoveType }  from './models/Game';
import { Document, Types } from 'mongoose';
import { RoomModel, RoomType, MessageType } from './models/Room';

export interface WSInfo {
  verified: boolean;
  userID: string;
  // roomID: string;
  // name: string;
}

const defaultWSInfo = (): WSInfo => {
  return {
    verified: false,
    userID: "",
    // roomID: "",
    // name: ""
  }
}

const authRequestToken = JSON.stringify({
  type: "status",
  payload: {
    name: "authentication request",
    userID: "",
    data: "",
  }
})

export interface RoomMapType {
    players: string[], //userID
    roomMongoID: Types.ObjectId,
    whitePlayerIndex: number
}

export interface ServerUserType {
    userID: string,
    name: string,
    email: string,
    profilePictureUrl: string,
    roomID: string
    user: UserType
}

// TODO Migrate to a better data structure for queue
const queue: string[] = [] // userID

// ! needs method to check if rooms are alive
const rooms = new Map<string, RoomMapType>();

// ! needs method to check if the ws are alive
// * (Solved) There can be duplicate of same user using different ws
const wsInfo = new Map<WebSocket, WSInfo>();

const userToWS = new Map<string, WebSocket>(); // * userID -> ws

const userInfo = new Map<string, ServerUserType>(); // * userID -> UserType



const onConnection = (ws: WebSocket) => {
  // if (ws.readyState === WebSocket.OPEN) {
  //   console.log('WebSocket connection is still alive.');
  // } else {
  //   console.log('WebSocket connection is closed.');
  // }

  wsInfo.set(ws, defaultWSInfo())
  ws.send(authRequestToken)

  console.log("Connection Made")
  ws.on('error', console.error);

  ws.on('message', async (byteString) => {
    //* Destructure message and check if ws is in wsInfo
    const {type, payload} = JSON.parse(byteString.toString());
    console.log("WS: ", type, payload);
    if (!wsInfo.has(ws) || wsInfo.get(ws) == undefined) throw new Error("WebSocket Info is None");
    

    if (type === "chat" || type === "game") {
      const userID = wsInfo.get(ws)?.userID
      if (userID ==undefined || userToWS.get(userID) !== ws) {

        console.log("Obsolete WS, aborting", userID)
        if (userID) console.log("PPOOO", userToWS.get(userID), ws)
        return
      }

      if (!wsInfo.get(ws)?.verified) {
        ws.send(authRequestToken)
        return
      } else if (userInfo.get(wsInfo.get(ws)!.userID)?.roomID === "") {
        console.error("Using chat while not paired")

        // ? This is duplicate code
        if (!queue.includes(userID)) queue.push(userID);
        ws.send(JSON.stringify({
          type: "status",
          payload: {
            name: "status update",
            userID: "",
            data: "in queue",
          }
        }))
        pairGameRoom(queue, rooms, wsInfo, userToWS, userInfo)
        return
      }
    }
    switch (type) {
      case "upgrade status":
        if (payload.name == "authentication") {
          //* Repeated authentication request
          if (wsInfo.get(ws)!.verified) {
            console.log("Repeated Authentication from", userInfo.get(wsInfo.get(ws)!.userID)!.name)
            ws.send(JSON.stringify({
              type: "status",
              payload: {
                name: "status update",
                userID: "",
                data: "authenticated",
              }
            }))
            break;
          }
          

          //* Verify jwtCredential to check that client is real
          try {
            // var duplicateUser: WSInfo | undefined = undefined;
            // let hasDuplicateUser = false
            const decoded = jwt.decode(payload.data) as JwtPayload;
            if (decoded == null) return
            // * Check for duplicate users using different ws
            // ! Bugs when interrupt ongoing game with duplicate login
            wsInfo.forEach((value, key) => {
              if (value.userID === decoded.sub! && key !== ws) {
                key.send(JSON.stringify({
                  type: "status",
                  payload: {
                    name: "status update",
                    userID: "",
                    data: "duplicate user",
                  }
                }))
                key.close();
                // duplicateUser = wsInfo.get(key)
                // wsInfo.set(key, defaultWSInfo());
                wsInfo.delete(key);
                
                // // * Remove from queue
                // // TODO clean up
                // const idx = queue.indexOf(key);
                // if (idx > -1) { // only splice array when item is found
                //   queue.splice(idx, 1); // 2nd parameter means remove one item only
                // }
              }
            }) 
            // ! to fix
            // if (duplicateUser == undefined) {
            const result: UserType | null = await UserModel.findOne({userID:decoded.sub});
            if (!result) throw new Error("Cannot find user.")
            wsInfo.set(ws, {
                verified: true,
                userID: result.userID,
                // roomID: "",
                // name: decoded.name,
            })
            userToWS.set(result.userID, ws)
            if (!userInfo.has(result.userID)) {
              userInfo.set(result.userID, {
                userID: result.userID,
                name: result.name,
                email: result.email,
                profilePictureUrl: result.profilePictureUrl,
                roomID: "",
                user: result,
              })
            }
            // } else {
            //   wsInfo.set(ws, duplicateUser)
            //   userToWS.set(duplicateUser.userID, ws)
            // }
          } catch (error) {
            console.log("Authentication Failed")
          }

          //* Send updated status to client
          if (wsInfo.get(ws)?.verified) {
            console.log("Authentication Succeeded for", userInfo.get(wsInfo.get(ws)!.userID)!.name)
            ws.send(JSON.stringify({
              type: "status",
              payload: {
                name: "status update",
                userID: "",
                data: "authenticated",
              }
            }))

          // ! had weird bug that this keeps firing but can't reproduce
          } else {
            ws.send(JSON.stringify({
              type: "status",
              payload: {
                name: "status update",
                userID: "",
                data: "duplicate user",
              }
            }))
          }
          // else {
          //   console.log("Authentication Failed")
          //   ws.send(JSON.stringify({
          //     type: "status",
          //     payload: {
          //       name: "status update",
          //       userID: "",
          //       data: "connected",
          //     }
          //   }))
          // }
          break;

        } else if (payload.name == "joinRoom") {
          const userID: string = wsInfo.get(ws)!.userID
          console.log("JJJOIIINNN", userInfo.get(userID)?.roomID)
          console.log(userInfo.get(userID)?.name)
          if (userInfo.get(userID)?.roomID !== "") {
            console.log("Already in room")
            ws.send(JSON.stringify({
              type: "status",
              payload: {
                name: "status update",
                userID: "",
                data: "paired",
              }
            }))
            const roomID = userInfo.get(userID)?.roomID;
            const room = rooms.get(roomID!)!
            const whitePlayerIndex = room.whitePlayerIndex;
            const opponentIndex = room.players[0] == userID ? 1 : 0;
            // console.log("OPPOE", room.players, userID, opponentIndex)

            const mongoRoom: RoomType | null = await RoomModel.findById(room.roomMongoID);
            const mongoMove: MoveType[] = mongoRoom!.game.moves;

            const mongoMessages: MessageType[] = mongoRoom!.messages;
            // console.log("MESSAGESSS:", mongoMessages)
            const opponentInfo: ServerUserType = userInfo.get(room.players[opponentIndex])!
            ws.send(JSON.stringify({
              type: "game",
              payload: {
                  name: "resume game",
                  userID: opponentInfo,   // * not an userID but actually UserType
                  data: whitePlayerIndex == opponentIndex ? "b" : "w",
                  fen: mongoMove[mongoMove.length - 1].fen,
                  messages: mongoMessages,

              }
          }))
          } else if (!wsInfo.get(ws)?.userID || !userInfo.has(wsInfo.get(ws)?.userID!)){
            throw new Error("ws that doesn't have authentication tries to pair")
          } else {
            const userID = wsInfo.get(ws)?.userID
            if (!userID) throw new Error("undefined userID during pairing")
            if (!queue.includes(userID)) queue.push(userID);
            ws.send(JSON.stringify({
              type: "status",
              payload: {
                name: "status update",
                userID: "",
                data: "in queue",
              }
            }))
            pairGameRoom(queue, rooms, wsInfo, userToWS, userInfo)
          }

        }
        break
      case "chat":
          // ! fix the uncertainties in here (wsInfo.get(ws)?.roomID!)
          const userID: string = wsInfo.get(ws)!.userID
          const room = rooms.get(userInfo.get(userID)?.roomID!);
          room?.players.forEach((userID) => {
            userToWS.get(userID)!.send(byteString.toString())
          })
          RoomModel.updateOne(
              { _id: room?.roomMongoID }, 
              { $push: { messages: {
                  sender: payload.name,
                  userID: payload.userID,
                  body: payload.data
              } } }
          ).catch(err=> {
              console.error(err)
              throw new Error()
          });
        break;
      case "game":
        if (payload.name === "move") {
          const userID: string = wsInfo.get(ws)!.userID
          const room = rooms.get(userInfo.get(userID)?.roomID!);
          const move: MoveType = JSON.parse(payload.data);
          // console.log("Move:", move)
          room?.players.forEach((userID) => {
            userToWS.get(userID)!.send(byteString.toString())
          })
          RoomModel.updateOne(
            { _id: room?.roomMongoID }, 
            { $push: { "game.moves": move } }
          ).catch(err=> {
              console.error(err)
              throw new Error()
          });
        }
      
    }

  });
}

setInterval(() => {
  console.log("----------")
  console.log("[WSINFO]", wsInfo.size)
  wsInfo.forEach((value, key) => {
    console.log(value.userID,",",userInfo.get(value.userID)?.name)
  }) 
  console.log("[Queue]")
  console.log("Length:", queue.length)
  console.log("[Rooms]")
  rooms.forEach((value, key) => {
    console.log(key)
    value.players.forEach((userID) => {
      console.log("    ", userInfo.get(userID)?.name)
    })
  }) 
  console.log("[UserToWS]:", userToWS.size)
  userToWS.forEach((value, key) => {
    console.log(key, userInfo.get(key)?.name)
  }) 
  console.log("----------")
}, 6000);
export default onConnection

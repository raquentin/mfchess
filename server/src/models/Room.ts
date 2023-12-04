import mongoose from "mongoose";

import { Schema, Types } from "mongoose";
import { GameSchema, GameType } from "./Game";

export interface MessageType {
    sender: string;
    userID: string;
    body: string,
}

const MessageSchema = new Schema<MessageType>({
    sender: {type: String, required: [true, 'Sender field is required.']},
    userID: {type: String, required: [true, 'UserID field is required.']},
    body: {type: String, required: [true, 'Body field is required.']},
});

export interface RoomType {
    roomID: string,
    users: Types.ObjectId[],
    messages: MessageType[],
    game: GameType,
}

const RoomSchema = new Schema<RoomType>({
    roomID: {
        type: String,
        required: true
    },
    users: [{type: Schema.Types.ObjectId, ref: "Users"}],
    messages: [MessageSchema],
    game: {
        type: GameSchema,
        required: false,
    }
});

// const MessageModel = mongoose.model<MessageType>('Message', MessageSchema)
const RoomModel = mongoose.model<RoomType>('Room', RoomSchema)


export {RoomModel}

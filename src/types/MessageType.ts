/**
 * * Message Type for sockets
 * ! To be extended
 */
export interface PayloadType {
    name: string;
    userID: string;
    data: string;
}

export interface MessageType {
    type: string;
    payload: PayloadType;
}

// export interface RoomType {
//     roomID: string;
//     allMessages: [PayloadType];
// }
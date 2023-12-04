import mongoose from 'mongoose';

interface UserType {
    userID: string,
    name: string,
    email: string,
    isAdmin: boolean,
    profilePictureUrl: string,
}

const UserSchema = new mongoose.Schema<UserType>({
    userID: { // sub
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    profilePictureUrl: {
        type: String,
        required: true
    },
    // pastRooms: {

    // }
});

const UserModel = mongoose.model<UserType>("Users", UserSchema);
export {UserModel, UserType};
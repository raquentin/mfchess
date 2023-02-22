/**
 * * User Type
 * ! To be extended
 */
export interface UserType {
    loggedIn: Boolean;
    userID: string;
    jwtCredential: string;

    socketStatus: string;

    name: string;
    email: string;
    profilePictureUrl: string;
}
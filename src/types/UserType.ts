/**
 * * User Type
 * ! To be extended
 */
export interface UserType {
    loggedIn: Boolean;
    userID: string;
    jwtCredential: string;

    name: string;
    email: string;
    profilePictureUrl: string;
}
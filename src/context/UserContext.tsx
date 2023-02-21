import React, { useContext, useState } from "react"
import {UserType} from "../types/User"

/**
 * * Type for UserContext
 * ? Not sure if the undefined thing is the best solution,
 * ? this causes the need to use null-assertion (!).
 */
type userContextType = [UserType | undefined, 
                        React.Dispatch<React.SetStateAction<UserType>> | undefined,
                        (() => void) | undefined]

const UserContext = React.createContext<userContextType>([undefined, undefined, undefined])

/**
 * * Function to grab UserContext from outside scripts
 * @returns the UserContext
 */
export const useUser = () => {
    return useContext(UserContext)
}

interface Props {
    children: React.ReactNode;
}
export const defaultUser = () => {
    return {loggedIn: false, userID: ""}
}
/**
 * * Function that Wraps the context into a JSX element to abstract useContext.
 */
export const UserProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<UserType>(defaultUser());

    /**
     * ! to be implemented, fetches user from DB using GraphQL or just axios calls
     */
    const fetchUser = () => {
        // ! don't change any local states such as loggedIn.
        // * use user.userID to query DB
        console.error("fetchUser undefined")
    }

    return (
        <UserContext.Provider value={[user, setUser, fetchUser]}>
            {children}
        </UserContext.Provider>
    )
}
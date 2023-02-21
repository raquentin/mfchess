import React, { useContext, useState } from "react"
import {UserType} from "../types/User"

type userContextType = [UserType | undefined, 
                        React.Dispatch<React.SetStateAction<UserType>> | undefined,
                        (() => void) | undefined]

const UserContext = React.createContext<userContextType>([undefined, undefined, undefined])
// const UserUpdateContext = React.createContext<updateFunctionType>(undefined)

export const useUser = () => {
    const returnValue: userContextType = useContext(UserContext)
    return returnValue
}
// export const useUpdateUser = () => {
//     const returnValue: updateFunctionType = useContext(UserUpdateContext)
//     if (returnValue === undefined) throw new Error("updateUser undefined")
//     return returnValue
// }

interface Props {
    children: React.ReactNode;
}
export const defaultUser = () => {
    return {loggedIn: false, userID: ""}
}

export const UserProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<UserType>(defaultUser());

    /**
     * ! to be implemented, fetches user from DB using GraphQL or just axios calls
     */
    const fetchUser = () => {
        // don't change any local states such as loggedIn.
        console.error("fetchUser undefined")
    }

    return (
        <UserContext.Provider value={[user, setUser, fetchUser]}>
            {children}
        </UserContext.Provider>
    )
}
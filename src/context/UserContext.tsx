import React, { useContext, useState } from "react"
import {UserType} from "../types/UserType"
import AxiosInstance from "../utils/axiosInstance";


/**
 * * Type for UserContext
 * ? Not sure if the undefined thing is the best solution,
 * ? this causes the need to use null-assertion (!).
 */
type userContextType = [UserType, 
                        React.Dispatch<React.SetStateAction<UserType>> | undefined,
                        (() => void) | undefined]

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

export const defaultUser: UserType = {
  loggedIn: false,
  userID: "0",
  jwtCredential: "",

  name: "Default User",
  email: "",
  profilePictureUrl: "",
  bannerPictureUrl: "",
  elo: 1000,
  country: "usa",
  description: "This is the default user description hellooooo"
}

const UserContext = React.createContext<userContextType>([defaultUser, undefined, undefined])

/**
 * * Function that Wraps the context into a JSX element to abstract useContext.
 */
export const UserProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<UserType>(defaultUser);

    /**
     * 
     */
    const fetchUser = () => {
        // * use user.userID to query DB
        if (!user.loggedIn) throw new Error("User not logged in.")
        AxiosInstance.post("login/userInfo", {
            sub: user.userID
        }).then((response) => {
            const fetchedUser = response.data.result[0]
            setUser((user: UserType) => {
                user.name = fetchedUser.name;
                user.email = fetchedUser.email;
                user.profilePictureUrl = fetchedUser.profilePictureUrl;
                return user;
              })
        });
    }

    return (
        <UserContext.Provider value={[user, setUser, fetchUser]}>
            {children}
        </UserContext.Provider>
    )
}
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import {UserType} from "../types/UserType"
import AxiosInstance from "../utils/axiosInstance";

const LOCALSTORAGE_KEY = "save-user";
const savedUserString = sessionStorage.getItem(LOCALSTORAGE_KEY);
const savedUser: null | UserType = savedUserString == null ? null : JSON.parse(savedUserString)


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
  color: "blue",
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
    console.log("local:", sessionStorage)
    if (savedUser) console.log("Pulled from saved user:", savedUser)
    const [user, setUser] = useState<UserType>(savedUser || defaultUser);

    const updateUser = (updateFunction: SetStateAction<UserType>) => {
        setUser(updateFunction);
        const newUser = typeof updateFunction === 'function' ? updateFunction(user) : updateFunction;
        if (newUser.loggedIn) {
            sessionStorage.removeItem(LOCALSTORAGE_KEY);
        } else {
            sessionStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newUser));
        }
    }
    // useEffect(() => {
    //     sessionStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(user));
    //     console.log("Saved:", user)
    // }, [user]);

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
            updateUser((user: UserType) => {
                user.name = fetchedUser.name;
                user.email = fetchedUser.email;
                user.profilePictureUrl = fetchedUser.profilePictureUrl;
                return user;
              })
        });
    }

    return (
        <UserContext.Provider value={[user, updateUser, fetchUser]}>
            {children}
        </UserContext.Provider>
    )
}

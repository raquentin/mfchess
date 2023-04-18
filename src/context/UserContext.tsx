import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import {UserType} from "../types/UserType"
import AxiosInstance from "../utils/axiosInstance";

const LOCALSTORAGE_KEY = "save-user";
// const savedUserString = sessionStorage.getItem(LOCALSTORAGE_KEY);
// console.log("Saved String", savedUserString)
// const savedUser: null | UserType = savedUserString == null ? null : JSON.parse(savedUserString)


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

export const defaultUser: Readonly<UserType> = {
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
    const savedUserString = sessionStorage.getItem(LOCALSTORAGE_KEY);
    // console.log("Saved String", savedUserString)
    const savedUser: null | UserType = savedUserString == null ? null : JSON.parse(savedUserString)

    // console.log("local:", sessionStorage)
    if (savedUser) console.log("Pulled from saved user:", savedUser)
    const [user, setUser] = useState<UserType>(savedUser || defaultUser);

    const updateUser = (updateFunction: SetStateAction<UserType>) => {
        console.log("Hasa", updateFunction, typeof updateFunction === 'function')
        const newUser = typeof updateFunction === 'function' ? updateFunction(user) : updateFunction;
        // const newUser = updateValue;
        console.log("newUser", newUser)

        if (newUser.loggedIn) {
            sessionStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newUser));
        } else {
            console.log("not logged in, delete")
            sessionStorage.removeItem(LOCALSTORAGE_KEY);
        }
        setUser(updateFunction);
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
                const updatedUser = {
                    ...user,
                    name: fetchedUser.name,
                    email: fetchedUser.email,
                    profilePictureUrl: fetchedUser.profilePictureUrl
                };
                
                return updatedUser;
              })
        });
    }

    return (
        <UserContext.Provider value={[user, updateUser, fetchUser]}>
            {children}
        </UserContext.Provider>
    )
}

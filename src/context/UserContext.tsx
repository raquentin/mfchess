import React, { useState } from "react"



interface UserType {
    loggedIn: Boolean;
}

export const UserContext = React.createContext<UserType>({loggedIn: false})

interface Props {
    children: React.ReactNode;
}


export const UserProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<UserType>({loggedIn: false});

    const toggleLoggedIn = () => {
        setUser((user: UserType) => {
            user.loggedIn = !user.loggedIn;
            return user;
        })
    }

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}
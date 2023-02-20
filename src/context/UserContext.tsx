import React, { useState } from "react"


export const UserContext = React.createContext(undefined)

interface Props {
    children: React.ReactNode;
}


export const UserProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState();

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}
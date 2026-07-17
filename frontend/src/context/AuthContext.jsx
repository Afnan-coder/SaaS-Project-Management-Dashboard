import { createContext } from "react";

export const AuthContext = createContext()

export const AuthProvider = (props) => {


    const value = {
      
    }

    return (<AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>)
}
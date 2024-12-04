import React, { createContext, useState } from "react"
import { AUTH_TOKEN_KEY, USERNAME_KEY, EMAIL_KEY } from "../../constants";

interface Auth{
    token:string|null;
    username:string|null;
    email:string|null;
    logOut:() => void;
}

interface AuthProviderParams{
    children:React.ReactNode,
}

export const AuthContext = createContext<Auth>()

const AuthProvider = ( props:AuthProviderParams ) => {
    const [token, setToken] = useState<string|null>(localStorage.getItem(AUTH_TOKEN_KEY));
    const [user, setUser] = useState<string|null>(localStorage.getItem(USERNAME_KEY));
    const [email, setEmail] = useState<string|null>(localStorage.getItem(EMAIL_KEY));

    const logOut = () => {
        setUser(null);
        setToken(null);
        setEmail(null);
        
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(EMAIL_KEY);
    }

    const value:Auth = {
        token : token,
        username : user,
        email : email,
        logOut : logOut,
    }

    return (
        <AuthContext.Provider value = {value}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;
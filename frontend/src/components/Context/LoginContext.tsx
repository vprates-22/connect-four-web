import React, { createContext, useEffect, useState } from "react"

interface Auth{
    token:string;
    username:string;
    email:string;
    logOut:() => void;
}

interface AuthProviderParams{
    children:React.ReactNode,
}

export const AuthContext = createContext<Auth>()

const AuthProvider = ( props:AuthProviderParams ) => {
    const [token, setToken] = useState<string>("");
    const [user, setUser] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    
    useEffect(() => {
        const tokenSaved = localStorage.getItem('Token');
        const userLogedIn = localStorage.getItem('User');
        const emailLogedIn = localStorage.getItem('Email');
        if(userLogedIn && tokenSaved && emailLogedIn){
            setUser(userLogedIn);
            setToken(tokenSaved);
            setEmail(emailLogedIn);
        }
    }, [email, token, token]);

    const logOut = () => {
        setUser('');
        setToken('');
        setEmail('');
        
        localStorage.removeItem('Token');
        localStorage.removeItem('User');
        localStorage.removeItem('Email');
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
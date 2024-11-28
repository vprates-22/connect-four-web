import React, { createContext, useEffect, useState } from "react"

interface Auth{
    token:string,
    username:string,
    email:string,
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
    }, []);

    const value:Auth = {
        token : token,
        username : user,
        email : email,
    }

    return (
        <AuthContext.Provider value = {value}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;
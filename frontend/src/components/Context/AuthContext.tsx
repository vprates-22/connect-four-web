import React, { createContext, useContext, useState } from "react"
import { AUTH_TOKEN_KEY, USERNAME_KEY, EMAIL_KEY } from "../../constants";
import { useNavigate } from "react-router-dom";

interface Auth{
    isAuth:boolean;
    token:string|null;
    username:string|null;
    email:string|null;
    logIn(loginData:{email:string, password:string}):Promise<void>;
    logOut(): void;
}

interface AuthProviderParams{
    children:React.ReactNode,
}

export const AuthContext = createContext<Auth>({} as Auth)

const AuthProvider = ( props:AuthProviderParams ) => {
    const [token, setToken] = useState<string|null>(localStorage.getItem(AUTH_TOKEN_KEY));
    const [user, setUser] = useState<string|null>(localStorage.getItem(USERNAME_KEY));
    const [email, setEmail] = useState<string|null>(localStorage.getItem(EMAIL_KEY));
    const [isAuth, setIsAuth] = useState<boolean>(token !== null);

    const navigate = useNavigate();

    const logIn = async (loginData:{email:string, password:string}) => {
        if(!(loginData.email && loginData.password)) return;
        
        fetch("http://localhost:8000/api_auth/login", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(loginData)
        }).then(response => response.json())
        .then(data => {
            setToken(data.token);
            setUser(data.user.username);
            setEmail(data.user.email);
            setIsAuth(true);

            localStorage.setItem(AUTH_TOKEN_KEY, data.token);
            localStorage.setItem(USERNAME_KEY, data.user.username);
            localStorage.setItem(EMAIL_KEY, data.user.email);
    
            navigate('/');
        }).catch(error => {
            console.log(error);
        });
    }

    const logOut = () => {
        setUser(null);
        setToken(null);
        setEmail(null);   
        setIsAuth(false);

        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(EMAIL_KEY);
    }

    const value:Auth = {
        isAuth : isAuth,
        token : token,
        username : user,
        email : email,
        logIn : logIn,
        logOut : logOut,
    }

    return (
        <AuthContext.Provider value = {value}>
            { props.children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export default AuthProvider;
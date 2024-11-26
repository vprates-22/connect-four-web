import PopUp from "./BasePopUp";
import LoginButton from "../Button/LoginButton";
import BasePopUpHeader from "./BasePopUpHeader";

import './LoginPopUp.css'

import { useState } from "react";

interface LoginPopUpParams{
    open:boolean;
    closeButton:boolean;
    onClose:() => void;
}

const LoginPopUp = (props:LoginPopUpParams) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return(
        <PopUp id='LoginPopUp' open={props.open}>
            <BasePopUpHeader closeButton={props.closeButton} onClose={props.onClose}
            title="Log In"/>
            <form className='LoginForm'>
                <div className='LoginLineParams'>
                    <label className='LoginLabel'>Email Adress</label>
                    <input type='text' id='LoginTextInput'
                    placeholder="me@example.com"
                    maxLength={128}
                    onChange={(e) => {setUsername(e.target.value)}}/>
                </div>

                <div className='LoginLineParams'>
                    <label className='LoginLabel'>Password</label>
                    <input type='password' id='LoginTextInput'
                    placeholder="Password"
                    maxLength={32}
                    onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                
                <div className="LoginHelp">
                    <a className="PasswordRetrive" href="/">Forgot my Password</a>
                    
                </div>
            </form>
            <LoginButton idName="LoginSaveButton" innerText="Login"
            emailAdress={username} password={password}/>
        </PopUp>
    );
}

export default LoginPopUp;
import PopUp from "./BasePopUp";
import LoginButton from "../Button/LoginButton";
import BasePopUpHeader from "./BasePopUpHeader";

import './LoginPopUp.css'

import { ChangeEvent, useState } from "react";

interface LoginPopUpParams{
    open:boolean;
    closeButton:boolean;
    onClose:() => void;
}

const LoginPopUp = (props:LoginPopUpParams) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const modifiedText = event.target.value;
        setUsername(modifiedText);
    }

    const handleClick = () => {
        
    }

    return(
        <PopUp id='LoginPopUp' open={props.open}>
            <BasePopUpHeader closeButton={props.closeButton} onClose={props.onClose}
            title="Login"/>
            <div className='LoginParams'>
                <div className='LoginLineParams'>
                    <label className='LoginLabel'>Username:</label>
                    <input type='text' id='LoginTextInput'
                    maxLength={20}
                    onChange={handleChange}/>
                </div>

                <div className='LoginLineParams'>
                    <label className='LoginLabel'>Password:</label>
                    <input type='password' id='LoginTextInput'
                    maxLength={20}
                    onChange={handleChange}/>
                </div>
            </div>
            <LoginButton idName="LoginSaveButton" innerText="Login"/>
        </PopUp>
    );
}

export default LoginPopUp;
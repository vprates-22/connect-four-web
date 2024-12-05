import PopUp from "./BasePopUp";

import './LoginPopUp.css'

import { useEffect, useState } from "react";
import LogInForm from "../Forms/LogInForm";
import { useAuth } from "../Context/AuthContext";
import SwitchPopUpHeader from "./SwitchPopUpHeader";
import SignUpForm from "../Forms/SignUpForm";

interface LoginPopUpParams{
    open:boolean;
    closeButton:boolean;
    doAfterAuth():void;
    onClose():void;
}

const LoginPopUp = (props:LoginPopUpParams) => {
    const { isAuth } = useAuth();
    const [loginSelected, setLogInSelected] = useState<boolean>(true);
    
    useEffect(() => {
        if( isAuth ){
            props.doAfterAuth();
        }
    }, [isAuth, props]);

    return(
        <PopUp id='LoginPopUp' open={props.open}>
            <SwitchPopUpHeader logInSelected={loginSelected} setLogInSelected={setLogInSelected}/>
            {
                loginSelected ?
                <LogInForm/> :
                <SignUpForm/>
            }
        </PopUp>
    );
}

export default LoginPopUp;
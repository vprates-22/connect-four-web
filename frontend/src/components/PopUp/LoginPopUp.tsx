import PopUp from "./BasePopUp";
import BasePopUpHeader from "./BasePopUpHeader";

import './LoginPopUp.css'

import { useEffect } from "react";
import LogInForm from "../Forms/LogInForm";
import { useAuth } from "../Context/AuthContext";

interface LoginPopUpParams{
    open:boolean;
    closeButton:boolean;
    doAfterAuth:() => void;
    onClose:() => void;
}

const LoginPopUp = (props:LoginPopUpParams) => {
    const { isAuth } = useAuth();
    
    useEffect(() => {
        if( isAuth ){
            props.doAfterAuth();
        }
    }, [isAuth, props])

    return(
        <PopUp id='LoginPopUp' open={props.open}>
            <BasePopUpHeader closeButton={props.closeButton} onClose={props.onClose}
            title="Log In"/>
            <LogInForm/>
        </PopUp>
    );
}

export default LoginPopUp;
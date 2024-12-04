import PopUp from "./BasePopUp";
import BasePopUpHeader from "./BasePopUpHeader";

import './LoginPopUp.css'

import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/LoginContext";
import LogInForm from "../Forms/LogInForm";

interface LoginPopUpParams{
    open:boolean;
    closeButton:boolean;
    doAfterAuth:() => void;
    onClose:() => void;
}

const LoginPopUp = (props:LoginPopUpParams) => {
    const auth = useContext(AuthContext);
    
    useEffect(() => {
        if(auth.token !== null){
            props.doAfterAuth();
        }
    }, [auth, props])

    return(
        <PopUp id='LoginPopUp' open={props.open}>
            <BasePopUpHeader closeButton={props.closeButton} onClose={props.onClose}
            title="Log In"/>
            <LogInForm/>
        </PopUp>
    );
}

export default LoginPopUp;
import PopUp from "./BasePopUp";
import BasePopUpHeader from "./BasePopUpHeader";

import './LoginPopUp.css'

import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";
import LogInForm from "../Forms/LogInForm";

interface LoginPopUpParams{
    open:boolean;
    closeButton:boolean;
    onClose:() => void;
}

const LoginPopUp = (props:LoginPopUpParams) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(auth.token){
            navigate('/');
        }
    }, [auth, navigate])

    return(
        <PopUp id='LoginPopUp' open={props.open}>
            <BasePopUpHeader closeButton={props.closeButton} onClose={props.onClose}
            title="Log In"/>
            <LogInForm/>
        </PopUp>
    );
}

export default LoginPopUp;
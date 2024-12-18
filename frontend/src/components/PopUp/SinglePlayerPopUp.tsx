import BasePopUpHeader from "./BasePopUpHeader.tsx";
import PopUp, { PopUpOpenParams } from "./BasePopUp.tsx";
import SinglePlayerForm from "../Forms/SinglePlayerForm.tsx";

import { useAuth } from "../Context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import './SinglePlayerPopUp.css'

const SinglePlayerPopUp = ( props:PopUpOpenParams ) => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuth && props.open){
            navigate('/login/');
        }
    }, [isAuth, navigate, props]);

    document.addEventListener('keyup', (e) => {
        if(e.code === 'Escape'){
            props.onClose();
        }
    });

    return (
        <PopUp id='SinglePlayerPopUp' open={props.open}>
            <BasePopUpHeader title='Singleplayer' closeButton={props.closeButton} onClose={props.onClose}/>
            <SinglePlayerForm/>
        </PopUp>
    );
}

export default SinglePlayerPopUp;
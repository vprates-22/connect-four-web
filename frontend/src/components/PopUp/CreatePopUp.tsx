import BasePopUpHeader from "./BasePopUpHeader.tsx";
import PopUp, { PopUpOpenParams } from "./BasePopUp.tsx";

import "./CreatePopUp.css"
import CreateRoomForm from "../Forms/CreateRoomForm.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.tsx";



const CreatePopUp = (props:PopUpOpenParams) => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuth && props.open)
            navigate('/login/');
    }, [isAuth, navigate, props])

    document.addEventListener('keyup', (e) => {
        if(e.code === 'Escape'){
            props.onClose();
        }
    })
    
    return (
    <PopUp id='CreatePopUp' open={props.open}>
        <BasePopUpHeader title='Create Room' closeButton={props.closeButton} onClose={props.onClose}/>
        <CreateRoomForm/>
    </PopUp>
    );
}

export default CreatePopUp;
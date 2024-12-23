import BasePopUpHeader from "./BasePopUpHeader";
import PopUp, { PopUpOpenParams } from "./BasePopUp";
import ContinueButton from "../Button/ContinueButton";

import { ChangeEvent, ClipboardEvent, useEffect, useState } from "react";

import "./WatchPopUp.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const WatchPopUp = (props:PopUpOpenParams) => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuth && props.open)
            navigate('/login/');
    }, [isAuth, navigate, props]);

    const [roomId, setRoomId] = useState<string>("");

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const modifiedText = event.target.value;
        setRoomId(modifiedText);
    }
    
    const handlePaste = (event:ClipboardEvent<HTMLInputElement>) => {
        const pastedText = event.clipboardData.getData('text');
        setRoomId(pastedText);
    }

    document.addEventListener('keyup', (e) => {
        if(e.code === 'Escape'){
            props.onClose();
        }
    });

    return (
        <>
        <PopUp id='WatchPopUp' open={props.open}>
            <BasePopUpHeader title='Watch Room' closeButton={props.closeButton} onClose={props.onClose}/>
            <div className='WatchParams'>
                <input type='text' className='GameRoom' 
                name='GameRoom' id='GameRoom'
                placeholder='Paste the room name here'
                maxLength={20}
                onChange={handleChange}
                onPaste={handlePaste}/>
            </div>
            <ContinueButton idName="WatchContinue" innerText="Continue"
            toPath="/watch/" wsUrl={`ws://127.0.0.1:8000/ws/watch/${roomId}/`}
            condition={roomId.length === 20}/>
        </PopUp>
        </>
    );
}

export default  WatchPopUp;
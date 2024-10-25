import PopUp, { PopUpOpenParams } from "./BasePopUp";
import BasePopUpHeader from "./BasePopUpHeader";

import { useNavigate } from "react-router-dom";
import { ChangeEvent, ClipboardEvent, useState } from "react";

import "./WatchPopUp.css"

const WatchPopUp = (props:PopUpOpenParams) => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState<string>("");

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const modifiedText = event.target.value;
        setRoomId(modifiedText);
    }
    
    const handlePaste = (event:ClipboardEvent<HTMLInputElement>) => {
        const pastedText = event.clipboardData.getData('text');
        setRoomId(pastedText);
    }

    const handleClick = () => {
        if(roomId.length < 20){
            return;
        }
        const ws_url = `ws://127.0.0.1:8000/ws/watch/${roomId}/`
        navigate('/watch/', {state: { ws_url }})
    }

    return (
        <>
        <PopUp id='WatchPopUp' open={props.open}>
            <BasePopUpHeader title='Watch Room' closeButton={true} onClose={props.onClose}/>
            <div className='WatchParams'>
                <input type='text' className='GameRoom' 
                name='GameRoom' id='GameRoom'
                placeholder='Paste the room name here'
                onChange={handleChange}
                onPaste={handlePaste}/>
            </div>
            <button className='SubmitButton' type='submit'
            onClick={handleClick}>Continue</button>
        </PopUp>
        </>
    );
}

export default  WatchPopUp;
import BasePopUpHeader from "./BasePopUpHeader";
import PopUp, { PopUpOpenParams } from "./BasePopUp";
import ContinueButton from "../Button/ContinueCreateButton";

import { ChangeEvent, ClipboardEvent, useState } from "react";

import "./WatchPopUp.css"

const WatchPopUp = (props:PopUpOpenParams) => {
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
    })

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
            <ContinueButton idName="WatchContinue" insideText="Continue"
            toPath="/watch/" wsUrl={`ws://127.0.0.1:8000/ws/watch/${roomId}/`}
            condition={roomId.length === 20}/>
        </PopUp>
        </>
    );
}

export default  WatchPopUp;
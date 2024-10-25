import PopUp, { PopUpOpenParams } from "./BasePopUp";
import BasePopUpHeader from "./BasePopUpHeader";

import "./WatchPopUp.css"

const WatchPopUp = (props:PopUpOpenParams) => {
    return (
        <>
        <PopUp id='WatchPopUp' open={props.open}>
            <BasePopUpHeader title='Watch Room' closeButton={true} onClose={props.onClose}/>
            <div className='WatchParams'>
                <input type='text' className='GameRoom' 
                name='GameRoom' id='GameRoom'
                placeholder='Paste the room name here'/>
            </div>
            <button className='SubmitButton' type='submit'>Continue</button>
        </PopUp>
        </>
    );
}

export default  WatchPopUp;
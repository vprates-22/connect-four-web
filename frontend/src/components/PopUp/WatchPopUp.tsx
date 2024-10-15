import PopUp, { PopUpOpenParams } from "./BasePopUp";
import "./WatchPopUp.css"

const WatchPopUp = (props:PopUpOpenParams) => {
    return (
        <>
        <PopUp title='Watch Room' id='WatchPopUp'
        open={props.open} onClose={props.onClose}>
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
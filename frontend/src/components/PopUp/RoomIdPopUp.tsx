import { WSContext } from "../WSContext/CreateWsContext";
import BasePopUpHeader from "./BasePopUpHeader";
import BasePopUp from "./BasePopUp";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import './RoomIdPopUp.css'

const RoomIdPopUp = () => {
    const navigate = useNavigate();
    const context = useContext(WSContext);

    const host = window.location.host;
    const path = `${host}/play/${context.roomId}/`;

    const copyRoomId = () => {
        navigator.clipboard.writeText(path);
    }

    return(
        <BasePopUp open={true} id="RoomIdPopUp">
            <BasePopUpHeader closeButton={false} title="Your Room Id" onClose={()=>{}}/>
            <div className="RoomIdDiv">
                <div className="RoomIdLine">
                    <div id='RoomId'>
                        {path}
                    </div>
                    <div className="CopyImg">
                        <img id='copyIcon' src='/Copy.png' onClick={() => {copyRoomId()}}></img>
                    </div>
                </div>
            </div>
            <button className='GoHomeButton' type='submit' 
            onClick={() => {navigate('/')}}>Exit Room</button>
        </BasePopUp>         
    );
}

export default RoomIdPopUp;
import { useContext } from "react";
import { WSContext } from "../../components/WSContext/CreateWsContext";
import BasePopUp from "../PopUp/BasePopUp";
import BasePopUpHeader from "../PopUp/BasePopUpHeader";

import "./WaitingCreate.css";
import { useNavigate } from "react-router-dom";
import Board from "../Game/Board";

const RoomInformer = () => {
    const navigate = useNavigate();
    const context = useContext(WSContext);

    const host = window.location.host;
    const path = `${host}/join/${context.roomId}/`;

    const copyRoomId = () => {
        navigator.clipboard.writeText(path);
    }
        

    return (
        context.gameState === 0 ?
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
        </BasePopUp> :
        <Board/>
    )
}

export default RoomInformer;
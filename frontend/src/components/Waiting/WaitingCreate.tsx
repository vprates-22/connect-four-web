import { useContext } from "react";
import { WSContext } from "../../components/WSContext/CreateWsContext";
import BasePopUp from "../PopUp/BasePopUp";
import BasePopUpHeader from "../PopUp/BasePopUpHeader";

import "./WaitingCreate.css";

const RoomInformer = () => {
    const context = useContext(WSContext);

    const copyRoomId = () => {
        navigator.clipboard.writeText(context.roomId);
    }

    return (
        <BasePopUp open={context.gameState === 0} id="RoomIdPopUp">
            <BasePopUpHeader closeButton={false} title="Your Room Id" onClose={()=>{}}/>
            <div className="RoomIdDiv">
                <div className="RoomIdLine">
                    <div id='RoomId'>
                        {context.roomId}
                    </div>
                    <div className="CopyImg">
                        <img id='copyIcon' src='/Copy.png' onClick={() => {copyRoomId()}}></img>
                    </div>
                </div>
            </div>
        </BasePopUp>
    )
}

export default RoomInformer;
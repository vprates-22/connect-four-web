import BasePopUp from "./BasePopUp";
import CopyLine from "../Lines/CopyLine";
import ExitButton from "../Button/ExitButton";
import BasePopUpHeader from "./BasePopUpHeader";
import { useWebsocket } from "../Context/CreateWsContext";

import './RoomIdPopUp.css'

const RoomIdPopUp = () => {
    const { roomId } = useWebsocket();

    const host = window.location.host;
    const path = `${host}/join/${roomId}/`;

    return(
        <BasePopUp open={true} id="RoomIdPopUp">
            <BasePopUpHeader closeButton={false} 
            title="Invite your friend" onClose={()=>{}}/>
            <div className="RoomIdDiv">
                <CopyLine info={path}/>
            </div>
            <ExitButton idName="PopUpGoHomeButton" text="Exit Room" redirectPath='/'/>
        </BasePopUp>         
    );
}

export default RoomIdPopUp;
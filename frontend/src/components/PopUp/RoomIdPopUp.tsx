import { WSContext } from "../WSContext/CreateWsContext";
import BasePopUpHeader from "./BasePopUpHeader";
import BasePopUp from "./BasePopUp";

import { useContext } from "react";

import './RoomIdPopUp.css'
import CopyLine from "../Others/CopyLine";
import ExitButton from "../Button/ExitButton";

const RoomIdPopUp = () => {
    const context = useContext(WSContext);

    const host = window.location.host;
    const path = `${host}/join/${context.roomId}/`;

    return(
        <BasePopUp open={true} id="RoomIdPopUp">
            <BasePopUpHeader closeButton={false} title="Your Room Id" onClose={()=>{}}/>
            <div className="RoomIdDiv">
                <CopyLine info={path}/>
            </div>
            <ExitButton idName="PopUpGoHomeButton" text="Exit Room" redirectPath='/'/>
        </BasePopUp>         
    );
}

export default RoomIdPopUp;
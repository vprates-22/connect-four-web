import { WSContext } from "../WSContext/CreateWsContext";

import { useContext } from "react"
import CopyLine from "../Others/CopyLine";

import './GameFooter.css'
import ExitButton from "../Button/ExitButton";

const GameFooter = () => {
    const context = useContext(WSContext);

    return(
        <footer className="GameFooter">
            <ExitButton idName="ExitRoomButton" text='Exit Room' redirectPath="/"/>
            <p id="ExtraInfo">Invite Your Friends</p>
            <CopyLine info={context.roomId}/>
        </footer>
    );
}

export default GameFooter;
import CopyLine from "../Lines/CopyLine";
import ExitButton from "../Button/ExitButton";
import { WSContext } from "../Context/CreateWsContext";

import { useContext } from "react"

import './GameFooter.css'

const GameFooter = () => {
    const context = useContext(WSContext);

    return(
        <footer className="GameFooter">
            <ExitButton idName="ExitRoomButton" text='Exit Room' redirectPath="/"/>
            <p id="Instruction">Invite Your Friends</p>
            <CopyLine info={context.roomId}/>
        </footer>
    );
}

export default GameFooter;
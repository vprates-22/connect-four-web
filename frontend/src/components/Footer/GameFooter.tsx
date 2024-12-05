import CopyLine from "../Lines/CopyLine";
import ExitButton from "../Button/ExitButton";
import { useWebsocket } from "../Context/CreateWsContext";

import './GameFooter.css'

const GameFooter = () => {
    const { roomId } = useWebsocket();

    return(
        <footer className="GameFooter">
            <ExitButton idName="ExitRoomButton" text='Exit Room' redirectPath="/"/>
            <p id="Instruction">Invite Your Friends</p>
            <CopyLine info={roomId}/>
        </footer>
    );
}

export default GameFooter;
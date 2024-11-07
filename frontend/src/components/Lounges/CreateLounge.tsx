import Board from "../Game/Board";
import RoomIdPopUp from "../PopUp/RoomIdPopUp";

import { useContext, useEffect } from "react";
import { WSContext } from "../WSContext/CreateWsContext";
import { useNavigate } from "react-router-dom";
import GameFooter from "../../components/Footer/GameFooter";


const CreateLounge = () => {
    const context = useContext(WSContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(context.socket?.readyState === WebSocket.CLOSING ||
            context.socket?.readyState === WebSocket.CLOSED){
            navigate('/', { state : {  }});
            return;
        }
    }, [context.socket?.readyState, navigate])

    return (
        !context.gameState ?
            <RoomIdPopUp/>:
            <>
                <Board/>            
                <GameFooter/>
            </>
    )
}

export default CreateLounge;
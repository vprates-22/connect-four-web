import Board from "../Game/Board";
import GameScore from "../Game/Score";
import RoomIdPopUp from "../PopUp/RoomIdPopUp";
import { WSContext } from "../WSContext/CreateWsContext";
import GameFooter from "../../components/Footer/GameFooter";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


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
                <GameScore/>
                <Board/>            
                <GameFooter/>
            </>
    )
}

export default CreateLounge;
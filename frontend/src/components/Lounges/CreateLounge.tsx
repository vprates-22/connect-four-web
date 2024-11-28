import Board from "../Game/Board";
import GameScore from "../Game/Score";
import RoomIdPopUp from "../PopUp/RoomIdPopUp";
import { WSContext } from "../Context/CreateWsContext";
import GameFooter from "../../components/Footer/GameFooter";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameResultLine from "../Lines/GameResultLine";


const CreateLounge = () => {
    const context = useContext(WSContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(context.socket?.readyState === WebSocket.CLOSING ||
            context.socket?.readyState === WebSocket.CLOSED){
            navigate('/', { state : { }});
            return;
        }
    }, [context.socket?.readyState, navigate])

    return (
        !context.gameState ?
            <RoomIdPopUp/>:
            <>
                {console.log(context)}
                {context.gameWinner == 0 ?
                "" 
                :<GameResultLine resultText={context.gameWinner === context.player ? 
                    "You Won!" : "You Lost!"}/>
                }
                <GameScore/>
                <Board/>            
                <GameFooter/>
            </>
    )
}

export default CreateLounge;
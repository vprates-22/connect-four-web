import Board from "../Game/Board";
import GameScore from "../Game/Score";
import RoomIdPopUp from "../PopUp/RoomIdPopUp";
import { useWebsocket } from "../Context/CreateWsContext";
import GameFooter from "../../components/Footer/GameFooter";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameResultLine from "../Lines/GameResultLine";


const CreateLounge = () => {
    const { socket, gameState, gameWinner, player } = useWebsocket();
    const navigate = useNavigate();

    useEffect(() => {
        if(socket?.readyState === WebSocket.CLOSING ||
            socket?.readyState === WebSocket.CLOSED){
            navigate('/', { state : { }});
            return;
        }
    }, [socket?.readyState, navigate]);

    return (
        !gameState ?
            <RoomIdPopUp/>:
            <>
                {gameWinner == 0 ?
                "" 
                :<GameResultLine resultText={
                    gameWinner === player ? 
                    "You Won!" : 
                    "You Lost!"}/>
                }
                <GameScore/>
                <Board/>            
                <GameFooter/>
            </>
    )
}

export default CreateLounge;
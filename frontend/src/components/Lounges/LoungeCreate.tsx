import Board from "../Game/Board";
import RoomIdPopUp from "../PopUp/RoomIdPopUp";

import { useContext } from "react";
import { WSContext } from "../WSContext/CreateWsContext";

const LoungeCreate = () => {
    const context = useContext(WSContext);

    return (
        context.gameState === 0 ?
        <RoomIdPopUp/> :
        <Board/>
    )
}

export default LoungeCreate;
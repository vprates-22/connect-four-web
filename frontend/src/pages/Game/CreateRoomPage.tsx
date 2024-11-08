import NavBar from "../../components/NavBar/NavBar"; 
import { CreatePopUpBody,
    HEIGTH_DEFAULT,
    WIDTH_DEFAULT,
    TIME_P_TURN_DEFAULT,
    TIME_P_PLAYER_DEFAULT
 } from "../../components/PopUp/CreatePopUp";

import { useState } from "react";

import './CreateRoomPage.css'
import ContinueButton from "../../components/Button/ContinueCreateButton";

const CreateRoomPage = () => {
    const [height, setHeight] = useState<number>(HEIGTH_DEFAULT);
    const [width, setWidth] = useState<number>(WIDTH_DEFAULT);
    const [timePTurn, setTimePTurn] = useState<number>(TIME_P_TURN_DEFAULT);
    const [timePPlayer, setTimePPlayer] = useState<number>(TIME_P_PLAYER_DEFAULT);

    return (
        <>
            <NavBar/>
            <CreatePopUpBody idName="GameParamsPage"  setHeight={setHeight} setWidth={setWidth}
            setTimePTurn={setTimePTurn} setTimePPlayer={setTimePPlayer}/>
            <ContinueButton idName="CreatePageContinue" insideText="Continue" condition={true}
            toPath='/play/' wsUrl={`ws://127.0.0.1:8000/ws/create/${height}/${width}/`}/>
        </>
    );
}

export default CreateRoomPage;
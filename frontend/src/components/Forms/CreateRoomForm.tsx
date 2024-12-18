import ContinueButton from "../Button/ContinueButton.tsx";

import { useState } from "react";
import { 
    HEIGHT_DEFAULT, WIDTH_DEFAULT, TIME_P_PLAYER_DEFAULT, TIME_P_TURN_DEFAULT
} from "../../constants";

import GetBoardParams from "../SelectInput/GetBoardParams.tsx";
import TimeParams from "../SelectInput/TimeParams.tsx";

import "./GameForm.css";

const CreateRoomForm = () => {
    const [height, setHeight] = useState<number>(HEIGHT_DEFAULT);
    const [width, setWidth] = useState<number>(WIDTH_DEFAULT);
    const [timePTurn, setTimePTurn] = useState<number>(TIME_P_TURN_DEFAULT);
    const [timePPlayer, setTimePPlayer] = useState<number>(TIME_P_PLAYER_DEFAULT);

    return (
        <form className='GameParamsForm' onSubmit={() => {}}>
            <div id="GameParamsBody">
                <GetBoardParams setHeight={setHeight} setWidth={setWidth}/>
                <TimeParams setTimePTurn = {setTimePTurn} setTimePPlayer = {setTimePPlayer}/>
            </div>
            <ContinueButton idName="ContinueCreate" innerText="Continue"
            toPath="/play/" wsUrl={`ws://127.0.0.1:8000/ws/create/${height}/${width}/`}
            condition={true}/>
        </form>
    );
}

export default CreateRoomForm;
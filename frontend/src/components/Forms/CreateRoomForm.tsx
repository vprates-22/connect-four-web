import ContinueButton from "../Button/ContinueCreateButton.tsx";

import { useState, ChangeEvent } from "react";
import { 
    HEIGTH_DEFAULT, WIDTH_DEFAULT, TIME_P_PLAYER_DEFAULT, TIME_P_TURN_DEFAULT,
    MIN_HEIGTH,     MIN_WIDTH,     MIN_TIME_P_PLAYER,     MIN_TIME_P_TURN,
    MAX_HEIGTH,     MAX_WIDTH,     MAX_TIME_P_PLAYER,     MAX_TIME_P_TURN
} from "../../constants";

import "./CreateRoomForm.css";

interface CreateOptParams {
    idName:string;
    minVal:number;
    maxVal:number;
    stepSize:number;
    defaultVal:number;
    setValue:(val:number) => void;
}

interface GetBoardParamsParams {
    setHeight:(val:number)=>void;
    setWidth:(val:number)=>void;
}

interface TimeParamsParams {
    setTimePTurn:(val:number)=>void;
    setTimePPlayer:(val:number)=>void;
}

const CreateOptions = (props:CreateOptParams) => {
    const idName:string = props.idName;
    const minVal:number = props.minVal;
    const maxVal:number = props.maxVal;
    const stepSize:number = props.stepSize;
    const defaultVal:number = props.defaultVal;

    const arrayLength = Math.ceil((maxVal - minVal + 1) / stepSize);
    const options = [...Array(arrayLength).keys()].map(i => i * stepSize + minVal);
    
    const handleChange = (event:ChangeEvent<HTMLSelectElement>) => {
        props.setValue(parseInt(event.target.value));
    }

    return(
        <select className='SelectBox' id={idName} defaultValue={defaultVal} onChange={handleChange}>
            {options.map(size => <option key={size} value={size}>{size}</option>)}
        </select>
    );
}

const GetBoardParams = (props:GetBoardParamsParams) => {
    return (
    <div className='GetBoardParams'>
        <h3 className='SubTitle'>Board Shape</h3>
        <div className='Params'>
            <label>Height...........................................</label> 
            <CreateOptions {...{idName:'Height', minVal:MIN_HEIGTH, maxVal:MAX_HEIGTH,
                                stepSize:1, defaultVal:HEIGTH_DEFAULT, setValue:props.setHeight}}/>
        </div>
        <div className='Params'>
            <label>Width............................................</label> 
            <CreateOptions {...{idName:'Width', minVal:MIN_WIDTH, maxVal:MAX_WIDTH,
                                stepSize:1, defaultVal:WIDTH_DEFAULT, setValue:props.setWidth}}/>
        </div>
    </div>
    );
}

const TimeParams = (props:TimeParamsParams) => {
    return (
    <div className='TimeParams'>
        <h3 className='SubTitle'>Game Clock</h3>
        <div className='Params'>
            <label>Seconds per Turn..........................</label>
            <CreateOptions {...{idName:'TimePTurn', minVal:MIN_TIME_P_TURN, maxVal:MAX_TIME_P_TURN,
                                stepSize:10, defaultVal:TIME_P_TURN_DEFAULT, setValue:props.setTimePTurn}}/>
        </div>
        <div className='Params'>
            <label>Minutes per Player........................</label>
            <CreateOptions {...{idName:'TimePPlayer', minVal:MIN_TIME_P_PLAYER, maxVal:MAX_TIME_P_PLAYER,
                                stepSize:1, defaultVal:TIME_P_PLAYER_DEFAULT, setValue:props.setTimePPlayer}}/>
        </div>
    </div>
    );
}

const CreateRoomForm = () => {
    const [height, setHeight] = useState<number>(HEIGTH_DEFAULT);
    const [width, setWidth] = useState<number>(WIDTH_DEFAULT);
    const [timePTurn, setTimePTurn] = useState<number>(TIME_P_TURN_DEFAULT);
    const [timePPlayer, setTimePPlayer] = useState<number>(TIME_P_PLAYER_DEFAULT);

    return (
        <form className='GameParamsForm'>
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
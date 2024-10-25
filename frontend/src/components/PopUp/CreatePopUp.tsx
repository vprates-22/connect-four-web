import { useNavigate } from "react-router-dom";
import PopUp, { PopUpOpenParams } from "./BasePopUp.tsx";
import BasePopUpHeader from "./BasePopUpHeader.tsx";

import "./CreatePopUp.css"
import { ChangeEvent, useState } from "react";

interface CreateOptParams {
    idName:string;
    minVal:number;
    maxVal:number;
    stepSize:number;
    defaultVal:number;
    setValue:(val:any) => void;
}

interface GetBoardParamsParams {
    setHeight:(val:any)=>void;
    setWidth:(val:any)=>void;
}

interface TimeParamsParams {
    setTimePTurn:(val:any)=>void;
    setTimePPlayer:(val:any)=>void;
}

const CreateOptions = (props:CreateOptParams) => {
    const idName:string = props.idName
    const minVal:number = props.minVal
    const maxVal:number = props.maxVal
    const stepSize:number = props.stepSize
    const defaultVal:number = props.defaultVal

    const arrayLength = Math.ceil((maxVal - minVal + 1) / stepSize)
    const options = [...Array(arrayLength).keys()].map(i => i * stepSize + minVal);
    
    const handleChange = (event:ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
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
            <label>Height......................................</label> 
            <CreateOptions {...{idName:'Height', minVal:6, maxVal:10,
                                stepSize:1, defaultVal:heightDefault, setValue:props.setHeight}}/>
        </div>
        <div className='Params'>
            <label>Width.......................................</label> 
            <CreateOptions {...{idName:'Width', minVal:7, maxVal:12, 
                                stepSize:1, defaultVal:widthDefault, setValue:props.setWidth}}/>
        </div>
    </div>
    );
}

const TimeParams = (props:TimeParamsParams) => {
    return (
    <div className='TimeParams'>
        <h3 className='SubTitle'>Game Clock</h3>
        <div className='Params'>
            <label>Seconds per Turn...................</label>
            <CreateOptions {...{idName:'TimePTurn', minVal:20, maxVal:50,
                                stepSize:10, defaultVal:timePTurnDefault, setValue:props.setTimePTurn}}/>
        </div>
        <div className='Params'>
            <label>Minutes per Player................</label>
            <CreateOptions {...{idName:'TimePPlayer', minVal:2, maxVal:5,
                                stepSize:1, defaultVal:timePPlayerDefault, setValue:props.setTimePPlayer}}/>
        </div>
    </div>
    );
}

const heightDefault = 7;
const widthDefault = 8;
const timePTurnDefault = 30;
const timePPlayerDefault = 4;

const CreatePopUp = (props:PopUpOpenParams) => {
    const navigate = useNavigate();
    const [height, setHeight] = useState<number>(heightDefault);
    const [width, setWidth] = useState<number>(widthDefault);
    const [timePTurn, setTimePTurn] = useState<number>(timePTurnDefault);
    const [timePPlayer, setTimePPlayer] = useState<number>(timePPlayerDefault);

    const playContinue = () => {
        const ws_url = `ws://127.0.0.1:8000/ws/create/${height}/${width}/`
        navigate('/play/', {state: {ws_url}})
    }

    return (
    <PopUp id='CreatePopUp' open={props.open}>
        <BasePopUpHeader title='Create Room' closeButton={true} onClose={props.onClose}/>
        <div className='GameParams'>
            <GetBoardParams {...{setHeight:setHeight, setWidth:setWidth}}/>
            <TimeParams {...{setTimePTurn: setTimePTurn, setTimePPlayer: setTimePPlayer}}/>
        </div>
        <button className='SubmitButton' type='submit' 
        onClick={playContinue}>Continue</button>
    </PopUp>
    );
}

export default CreatePopUp;
import BasePopUpHeader from "./BasePopUpHeader.tsx";
import PopUp, { PopUpOpenParams } from "./BasePopUp.tsx";
import ContinueButton from "../Button/ContinueCreateButton.tsx";

import { ChangeEvent, useState } from "react";

import "./CreatePopUp.css"

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

interface CreateOptBodyParams{
    idName:string;
    setHeight:(val:any)=>void;
    setWidth:(val:any)=>void;
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
            <label>Height...........................................</label> 
            <CreateOptions {...{idName:'Height', minVal:6, maxVal:10,
                                stepSize:1, defaultVal:HEIGTH_DEFAULT, setValue:props.setHeight}}/>
        </div>
        <div className='Params'>
            <label>Width............................................</label> 
            <CreateOptions {...{idName:'Width', minVal:7, maxVal:12, 
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
            <CreateOptions {...{idName:'TimePTurn', minVal:20, maxVal:50,
                                stepSize:10, defaultVal:TIME_P_TURN_DEFAULT, setValue:props.setTimePTurn}}/>
        </div>
        <div className='Params'>
            <label>Minutes per Player........................</label>
            <CreateOptions {...{idName:'TimePPlayer', minVal:2, maxVal:5,
                                stepSize:1, defaultVal:TIME_P_PLAYER_DEFAULT, setValue:props.setTimePPlayer}}/>
        </div>
    </div>
    );
}

export const HEIGTH_DEFAULT = 7;
export const WIDTH_DEFAULT = 8;
export const TIME_P_TURN_DEFAULT = 30;
export const TIME_P_PLAYER_DEFAULT = 4;

export const CreatePopUpBody = (props:CreateOptBodyParams) => {
    return (
        <div className='GameParams' id={props.idName}>
            <GetBoardParams {...{setHeight:props.setHeight, setWidth:props.setWidth}}/>
            <TimeParams {...{setTimePTurn: props.setTimePTurn, setTimePPlayer: props.setTimePPlayer}}/>
        </div>
    );
}

const CreatePopUp = (props:PopUpOpenParams) => {
    const [height, setHeight] = useState<number>(HEIGTH_DEFAULT);
    const [width, setWidth] = useState<number>(WIDTH_DEFAULT);
    const [timePTurn, setTimePTurn] = useState<number>(TIME_P_TURN_DEFAULT);
    const [timePPlayer, setTimePPlayer] = useState<number>(TIME_P_PLAYER_DEFAULT);

    document.addEventListener('keyup', (e) => {
        if(e.code === 'Escape'){
            props.onClose();
        }
    })
    
    return (
    <PopUp id='CreatePopUp' open={props.open}>
        <BasePopUpHeader title='Create Room' closeButton={props.closeButton} onClose={props.onClose}/>
        <CreatePopUpBody idName="GameParamsBody" setHeight={setHeight} setWidth={setWidth}
        setTimePTurn={setTimePTurn} setTimePPlayer={setTimePPlayer}/>
        <ContinueButton idName="ContinueCreate" innerText="Continue"
        toPath="/play/" wsUrl={`ws://127.0.0.1:8000/ws/create/${height}/${width}/`}
        condition={true}/>
    </PopUp>
    );
}

export default CreatePopUp;
import PopUp from './PopUp.tsx';

import './CreatePopUp.css'

type CreateOptParams = {
    idName:string,
    minVal:number,
    maxVal:number,
    stepSize:number,
    defaultVal:number
}

const CreateOptions = (params:CreateOptParams) => {
    const idName:string = params.idName
    const minVal:number = params.minVal
    const maxVal:number = params.maxVal
    const stepSize:number = params.stepSize
    const defaultVal:number = params.defaultVal

    const arrayLength = Math.ceil((maxVal - minVal + 1) / stepSize)
    const options = [...Array(arrayLength).keys()].map(i => i * stepSize + minVal);
    
    return(
        <select className='SelectBox' id={idName} value={defaultVal}>
            {options.map(size => <option value={size}>{size}</option>)}
        </select>
    );
}

const BoardParams = () => {
    return (
    <div className='BoardParams'>
        <h3 className='SubTitle'>Board Shape</h3>
        <div className='Params'>
            <label>Height......................................</label> 
            <CreateOptions {...{idName:'Height', minVal:6, maxVal:10,
                                stepSize:1, defaultVal:7}}/>
        </div>
        <div className='Params'>
            <label>Width.......................................</label> 
            <CreateOptions {...{idName:'Width', minVal:7, maxVal:12, 
                                stepSize:1, defaultVal:8}}/>
        </div>
    </div>
    );
}

const TimeParams = () => {
    return (
    <div className='TimeParams'>
        <h3 className='SubTitle'>Game Clock</h3>
        <div className='Params'>
            <label>Seconds per Turn...................</label>
            <CreateOptions {...{idName:'TimePTurn', minVal:20, maxVal:50,
                                stepSize:10, defaultVal:30}}/>
        </div>
        <div className='Params'>
            <label>Minutes per Player................</label>
            <CreateOptions {...{idName:'TimePPlayer', minVal:2, maxVal:5,
                                stepSize:1, defaultVal:4}}/>
        </div>
    </div>
    );
}

const CreatePopUp = (props:any) => {
    return (
    <PopUp {...{}}>
        <div className='PopUpHeader'>
            <h1 className='Title'>Create Room</h1>
            <button className='CloseButton'>&times;</button>
        </div>
        <div className='GameParams'>
            <BoardParams/>
            <TimeParams/>
        </div>
        <button className='SubmitButton' type='submit'>Continue </button>
    </PopUp>
    );
}

export default CreatePopUp;
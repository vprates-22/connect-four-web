import { ChangeEvent } from "react";

interface CreateNumericOptParams {
    idName:string;
    minVal:number;
    maxVal:number;
    stepSize:number;
    defaultVal:number;
    setValue(val:number):void;
}

const CreateNumericOptions = (props:CreateNumericOptParams) => {
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
        <select className='SelectBoxNumerical' id={idName} defaultValue={defaultVal} onChange={handleChange}>
            {options.map(size => <option key={size} value={size}>{size}</option>)}
        </select>
    );
}

export default CreateNumericOptions;
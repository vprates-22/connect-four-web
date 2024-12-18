import { ChangeEvent } from "react";

interface CreateTextualOptParams {
    idName:string;
    defaultVal:string;
    optionList:Array<string>;
    setValue(val:number):void;
}

const CreateTextualOptions = ( props:CreateTextualOptParams ) => {
    const idName:string = props.idName;
    const defaultVal:string = props.defaultVal;
    const optionList:Array<string> = props.optionList;

    const handleChange = (event:ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.selectedIndex);
    }

    return(
        <select className='SelectBoxTextual' id={idName} defaultValue={defaultVal} onChange={handleChange}>
            {optionList.map(size => <option key={size} value={size}>{size}</option>)}
        </select>
    );
}

export default CreateTextualOptions;
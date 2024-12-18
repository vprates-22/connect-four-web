import { 
    HEIGHT_DEFAULT, WIDTH_DEFAULT,
    MIN_HEIGHT,     MIN_WIDTH,    
    MAX_HEIGHT,     MAX_WIDTH,    
} from "../../constants";

import CreateNumericOptions from "./CreateNumericOptions";

interface GetBoardParamsParams {
    setHeight(val:number):void;
    setWidth(val:number):void;
}

const GetBoardParams = (props:GetBoardParamsParams) => {
    return (
    <div className='GetBoardParams'>
        <h3 className='SubTitle'>Board Shape</h3>
        <div className='Params'>
            <label>Height...........................................</label> 
            <CreateNumericOptions idName={'Height'} minVal={MIN_HEIGHT} maxVal={MAX_HEIGHT}
                    stepSize={1} defaultVal={HEIGHT_DEFAULT} setValue={props.setHeight}/>
        </div>
        <div className='Params'>
            <label>Width............................................</label> 
            <CreateNumericOptions idName={'Width'} minVal={MIN_WIDTH} maxVal={MAX_WIDTH}
                    stepSize={1} defaultVal={WIDTH_DEFAULT} setValue={props.setWidth}/>
        </div>
    </div>
    );
}

export default GetBoardParams;
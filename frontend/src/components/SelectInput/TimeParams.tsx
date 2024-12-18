import { 
    TIME_P_PLAYER_DEFAULT, TIME_P_TURN_DEFAULT,
    MIN_TIME_P_PLAYER,     MIN_TIME_P_TURN,
    MAX_TIME_P_PLAYER,     MAX_TIME_P_TURN
} from "../../constants";

import CreateNumericOptions from "./CreateNumericOptions";

interface TimeParamsParams {
    setTimePTurn(val:number):void;
    setTimePPlayer(val:number):void;
}

const TimeParams = (props:TimeParamsParams) => {
    return (
    <div className='TimeParams'>
        <h3 className='SubTitle'>Game Clock</h3>
        <div className='Params'>
            <label>Seconds per Turn..........................</label>
            <CreateNumericOptions idName={'TimePTurn'} minVal={MIN_TIME_P_TURN} maxVal={MAX_TIME_P_TURN}
                    stepSize={10} defaultVal={TIME_P_TURN_DEFAULT} setValue={props.setTimePTurn}/>
        </div>
        <div className='Params'>
            <label>Minutes per Player........................</label>
            <CreateNumericOptions idName={'TimePPlayer'} minVal={MIN_TIME_P_PLAYER} maxVal={MAX_TIME_P_PLAYER}
                    stepSize={1} defaultVal={TIME_P_PLAYER_DEFAULT} setValue={props.setTimePPlayer}/>
        </div>
    </div>
    );
}

export default TimeParams;
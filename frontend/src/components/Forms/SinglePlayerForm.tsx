import ContinueButton from '../Button/ContinueButton';
import GetBoardParams from '../SelectInput/GetBoardParams';
import DifficultyParams from '../SelectInput/DifficultyParams';

import { useState } from 'react';

import { 
    HEIGHT_DEFAULT, WIDTH_DEFAULT, DIFFICULTY_DEFAULT
} from "../../constants";

import './GameForm.css';

const SinglePlayerForm = () => {
    const [height, setHeight] = useState<number>(HEIGHT_DEFAULT);
    const [width, setWidth] = useState<number>(WIDTH_DEFAULT);
    const [difficulty, setDifficulty] = useState<number>(DIFFICULTY_DEFAULT);

    return(
        <form className='GameParamsForm' onSubmit={() => {}}>
            <div id="GameParamsBody">
                <GetBoardParams setHeight={setHeight} setWidth={setWidth}/>
                <DifficultyParams setDifficulty={setDifficulty}/>
            </div>
            <ContinueButton idName="ContinueCreate" innerText="Continue"
            toPath="/play/" wsUrl={`ws://127.0.0.1:8000/ws/single_player/${height}/${width}/${difficulty*2}/`}
            condition={true}/>
        </form>
    )
}

export default SinglePlayerForm;
import CreateTextualOptions from './CreateTextualOptions';

interface DifficultyParamsParams{
    setDifficulty(val:number):void;
};

const DifficultyParams = ( props:DifficultyParamsParams ) => {
    const difficultyList:Array<string> = ['Easy', 'Medium', 'Hard'];

    return (
    <div className='GetDifficultyParams'>
        <h3 className='SubTitle'>Game Difficulty</h3>
        <div className='Params'>
            <label>Difficulty.............................</label> 
            <CreateTextualOptions idName={'Difficulty'} defaultVal={difficultyList[1]}
                optionList={difficultyList} setValue={props.setDifficulty}/>
        </div>
    </div>
    );
}

export default DifficultyParams;
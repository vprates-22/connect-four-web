import './GameResultLine.css';

interface GameResultLineParams{
    resultText:string
}

const GameResultLine = (props:GameResultLineParams) => {
    return (
    <div className="ResultMessage">
        {props.resultText}
    </div>
    );
};

export default GameResultLine;
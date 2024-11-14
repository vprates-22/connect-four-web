import { useState, useEffect } from 'react';

import './GameResultLine.css';

interface GameResultLineParams{
    resultText:string
}

const GameResultLine = (props:GameResultLineParams) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false);
        }, 500)
    }, []);

    return (
    <div className={`ResultMessage ${isVisible ? 'begin' : 'end'}`}>
        {props.resultText}
    </div>
    );
};

export default GameResultLine;
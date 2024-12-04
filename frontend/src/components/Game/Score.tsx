import { useContext } from 'react';
import { WSContext } from '../Context/CreateWsContext';

import './Score.css'

const GameScore = () => {
    const context = useContext(WSContext);
    
    return (
        <>
        <div className="GameScore">
            <div className='PlayerScore'>
                {context.playerOne}
                <img className='UserPic' src="/User.png"/>
            </div>

            <div className='TurnScore'>   
                <i style={context.turn % 2 === 0 ? {color:'#001F3F'} : {}}>
                    &#11164;</i>
                <div className='divider'></div>
                Turn {context.turn}
                <div className='divider'></div>
                <i style={context.turn % 2 === 1 ? {color:'#001F3F'} : {}}>
                    &#11166;</i>
            </div>

            <div className='PlayerScore'>
                <img className='UserPic' src="/User.png"/>
                {context.playerTwo}
            </div>
        </div>
        </>
    );
}

export default GameScore;
import { useContext } from 'react';
import { WSContext } from '../Context/CreateWsContext';

import './Score.css'

const GameScore = () => {
    const context = useContext(WSContext);
    const playerTwoTurn = context.turn % 2 == 0;

    return (
        <>
        <div className="GameScore">
            <div className='PlayerScore'>
                {context.player == 1 ?
                "(You) " + context.playerOne 
                : context.playerOne
                } 
                <img className='UserPic' src="/User.png"/>
            </div>

            <div className='TurnScore'>   
                <img id = {playerTwoTurn ? 'invisibleArrow' : 'leftArrow'} src='/Arrow.png'></img>
                <div className='divider'></div>
                Turn {context.turn}
                <div className='divider'></div>
                <img id = {playerTwoTurn ?  'rightArrow' : 'invisibleArrow'} src='/Arrow.png'></img>

            </div>

            <div className='PlayerScore'>
                <img className='UserPic' src="/User.png"/>
                {context.player == 1 ?
                context.playerTwo : 
                context.playerTwo + " (You)"}
            </div>
        </div>
        </>
    );
}

export default GameScore;
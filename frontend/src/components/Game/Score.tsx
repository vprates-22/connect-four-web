import { useWebsocket } from '../Context/CreateWsContext';

import './Score.css'

const GameScore = () => {
    const { turn, player, playerOne, playerTwo } = useWebsocket();
    const playerTwoTurn = turn % 2 == 0;

    return (
        <>
        <div className="GameScore">
            <div className='PlayerScore'>
                {player == 1 ?
                "(You) " + playerOne 
                : playerOne
                } 
                <img className='UserPic' src="/User.png"/>
            </div>

            <div className='TurnScore'>   
                <img id = {playerTwoTurn ? 'invisibleArrow' : 'leftArrow'} src='/Arrow.png'></img>
                <div className='divider'></div>
                Turn {turn}
                <div className='divider'></div>
                <img id = {playerTwoTurn ?  'rightArrow' : 'invisibleArrow'} src='/Arrow.png'></img>

            </div>

            <div className='PlayerScore'>
                <img className='UserPic' src="/User.png"/>
                {player == 1 ?
                playerTwo : 
                playerTwo + " (You)"}
            </div>
        </div>
        </>
    );
}

export default GameScore;
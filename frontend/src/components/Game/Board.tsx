import { WSContext } from '../Context/CreateWsContext';

import { useContext } from 'react';

import './Board.css';

interface BuildBoardParams {
    board:Array<Array<number>>;
    handleClick(colIndex:number):void;
}

interface BuildRowParams {
    row:Array<number>;
    rowIndex:number;
    handleClick(colIndex:number):void;
}

const BuildRow = (props:BuildRowParams) => {
    const context = useContext(WSContext);
    return(
        <div className='BoardRow'>
            {
                props.row.map((tile, colIndex) => {
                    const actualPosition = [props.rowIndex, colIndex]
                    const isWinningSeq = context.winningSeq.some(a => actualPosition.every((v, i) => v === a[i]));
                    const content = isWinningSeq? '★' : '';
                    switch(tile){
                        case 0:
                            return <div className='BoardTile' id='Empty' key={colIndex}
                            onClick={() => {props.handleClick(colIndex)}}>{content}</div>
                        case 1:
                            return <div className='BoardTile' id='Red' key={colIndex} 
                            onClick={() => {props.handleClick(colIndex)}}>{content}</div>
                        case 2:
                            return <div className='BoardTile' id='Yellow' key={colIndex} 
                            onClick={() => {props.handleClick(colIndex)}}>{content}</div>
                        default:
                            return;
                    }
                }
                )
            }
        </div>
    );
}

const BuildBoard = (props:BuildBoardParams) => {
    return(
        <div className='BoardColumns'>
            {
            props.board.map((r, rowIndex) => 
                <BuildRow key={rowIndex} row={r} 
                rowIndex={rowIndex} handleClick={props.handleClick}/>)
            }
        </div>
    );
}

const Board = () => {
    const context = useContext(WSContext);

    const handleClick = (colIndex:number) => {
        if(context.lowestTiles[colIndex] === -1){
            return;
        }
        context.socket?.send(
            JSON.stringify(
                {
                    type : 'move',
                    message : null,
                    height : null,
                    width : null,
                    player : null,
                    x : colIndex,
                    turn : null,
                    game_won : null,
                    game_winner : null,
                    winning_sequence : null,
                }
            )
        )
    }

    return(
        <div className='GameBoard'>
            <BuildBoard board={context.board} handleClick={handleClick}/>
        </div>
    );
}

export default Board;
import { useContext } from 'react';
import { WSContext } from '../WSContext/CreateWsContext';

import './Board.css';

interface BuildBoardParams {
    board:Array<Array<number>>;
    handleClick:(colIndex:number) => void;
}

interface BuildRowParams {
    row:Array<number>;
    rowIndex:number;
    handleClick:(colIndex:number) => void;
}

const BuildRow = (props:BuildRowParams) => {

    return(
        <div className='BoardRow'>
            {
                props.row.map((tile, colIndex) => 
                    tile === 0 ?
                    <div className='BoardTile' id='Empty' key={colIndex} onClick={() => {props.handleClick(colIndex)}}/>
                    : tile === 1 ?
                        <div className='BoardTile' id='Red' key={colIndex} onClick={() => {props.handleClick(colIndex)}}/>
                        :<div className='BoardTile' id='Yellow' key={colIndex} onClick={() => {props.handleClick(colIndex)}}/>
                )
            }
        </div>
    );
}

const BuildBoard = (props:BuildBoardParams) => {
    return(
        <div className='BoardColumns'>
            {
                props.board.map((r, rowIndex) => <BuildRow key={rowIndex} row={r} rowIndex={rowIndex} handleClick={props.handleClick}/>)
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
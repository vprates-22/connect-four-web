import { useState } from 'react';
import './Board.css'

type BoardParams = {
    height:number;
    width:number;
}

type ColBuilderParams = {
    board:Array<Array<number>>;
    handleClick:(row:number, col:number, val:number) => void;
}

type RowBuilderParams = {
    rowIndex:number;
    row:Array<number>;
    handleClick:(row:number, col:number, val:number) => void;
}

const BuildRow = (props:RowBuilderParams) => {
    return(
        <div className='BoardRow'>
            {props.row.map((tile, colIndex) => <div className='BoardTile' key={tile}
             onClick={props.handleClick(props.rowIndex, colIndex, 2)}
             style={tile == 1 ? 'background-color:red' : tile == 2 ? 'background-color:yellow' : 'background-color:white'}>

             </div>)}
        </div>
    );
}

const BuildBoard = (props:ColBuilderParams) => {
    return(
        <div className='BoardColumns'>
            {props.board.map(_ => <BuildRow />)}
        </div>
    );
}

const Board = (props:BoardParams) => {
    const [board, setBoard] = useState<Array<Array<number>>>
        (Array(props.height).fill(Array(props.width).fill(0)));
    
    // const socket = WebSocket(

    // );

    const handleClick = (row:number, col:number, val:number) => {
        const newBoard:Array<Array<number>>
         = board.map((r, rowIndex) => 
            r.map((tile, colIndex) => {
                if(rowIndex == row && colIndex == col){
                    return val;
                }
                return tile
            })
        );
        setBoard(newBoard);
    }

    return(
        <div className='GameBoard'>
            <BuildBoard board={board} handleClick={handleClick}/>
        </div>
    );
}

export default Board;
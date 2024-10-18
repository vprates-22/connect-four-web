import { useState } from 'react';
import './Board.css'

type BoardParams = {
    height:number;
    width:number;
    mode:string;
}

type ColBuilderParams = {
    board:Array<Array<number>>;
}

type RowBuilderParams = {
    rowIndex:number;
    row:Array<number>;
}

type Message = {
    type:string;
    message:string;
    player:number,
    x:number,
    turn:number,
    game_won:boolean,
    game_winner:number,
    winning_sequence:Array<number>,
}

const BuildRow = (props:RowBuilderParams) => {
    return(
        <div className='BoardRow'>

        </div>
    );
}

const BuildBoard = (props:ColBuilderParams) => {
    return(
        <div className='BoardColumns'>
            
        </div>
    );
}

const Board = (props:BoardParams) => {
    const [board, setBoard] = useState<Array<Array<number>>>
        (Array(props.height).fill(Array(props.width).fill(0)));
    
    const [lowestTiles, setLowestTiles] = useState<Array<number>>
        (Array(props.width).fill(props.height-1));

    const updateBoard = () => {

    }

    const socket = new WebSocket(
        'ws://localhost:8000/ws/'
        + props.mode
        + '/'
        + props.height
        + '/'
        + props.width
        + '/'
    );

    socket.onmessage = (e) => {
        const data:Message = JSON.parse(e.data);
        switch(data.type){
            case 'kill':
                socket.close();
                break;
            case 'play':
                console
                break;
        }
    }

    return(
        <div className='GameBoard'>
            
        </div>
    );
}

export default Board;
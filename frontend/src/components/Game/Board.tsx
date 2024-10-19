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

    const updateBoard = (row:number, col:number, val:number) => {
        const newBoard = board.map((r, rowIndex) => 
            r.map((tile, colIndex) => {
                if(row === rowIndex && col === colIndex)
                    return val;
                return tile;
            })
        );

        setBoard(newBoard);
    }
    
    const updateLowestTiles = (col:number) => {
        const newLowestTiles = lowestTiles.map((c, colIndex) => {
            if(colIndex === col && c >= 0)
                return c - 1;
            return c;
        });
        
        setLowestTiles(newLowestTiles);
    }

    const socket:WebSocket = new WebSocket(
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
                let player = data.player;
                let x = data.x;
                let y = lowestTiles[x];
                updateBoard(y, x, player);
                updateLowestTiles(x);
                break;
        }
    }

    return(
        <div className='GameBoard'>
            
        </div>
    );
}

export default Board;
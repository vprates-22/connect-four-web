import './Board.css'

type BoardParams = {
    height:number;
    width:number;
}

const BuildRow = ({width}: {width:number}) => {
    const row = [...Array(width)].map(_ => 0);
    
    return(
        <div className='BoardRow'>
            {row.map(_ => <div className='BoardTile'>0</div>)}
        </div>
    );
}

const BuildBoard = (props:BoardParams) => {
    const columns = [...Array(props.height)].map(_ => 0);

    return(
        <div className='BoardColumns'>
            {columns.map(_ => <BuildRow width={props.width}/>)}
        </div>
    );
}

const Board = (props:BoardParams) => {
    // const top;
    
    return(
        <div className='GameBoard'>
            <BuildBoard height={props.height} width={props.width}/>
        </div>
    );
}

export default Board;
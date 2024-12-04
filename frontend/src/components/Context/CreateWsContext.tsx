import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface WebSocketContextParams {
    children:React.ReactNode;
    WS_URL:string;
}

export interface Context {
    socket:WebSocket|null;
    player:number;
    playerOne:string;
    playerTwo:string;
    gameWinner:number;
    board:Array<Array<number>>;
    gameState:boolean;
    lowestTiles:Array<number>;
    roomId:string;
    turn:number;
    winningSeq:Array<Array<number>>;
}

export interface Message {
    type:string;
    player_one:string;
    player_two:string;
    message:string;
    height:number;
    width:number;
    player:number;
    game_active:boolean;
    board:Array<Array<number>>;
    lowest_tiles:Array<number>;    
    x:number;
    turn:number;
    game_won:boolean;
    game_winner:number;
    winning_sequence:Array<Array<number>>;
}
    
export const WSContext = createContext<Context>({} as Context);

const WebsocketProvider = ( props:WebSocketContextParams ) => {
    const navigate = useNavigate();

    const ws = useRef<WebSocket | null>(null);
    const [turn, setTurn] = useState<number>(1);
    const [player, setPlayer] = useState<number>(0);
    const [playerOne, setPlayerOne] = useState<string>('');
    const [playerTwo, setPlayerTwo] = useState<string>('');
    const [winner, setWinner] = useState<number>(0);
    const [roomId, setRoomId] = useState<string>("");
    const [gameState, setGameState] = useState<boolean>(false);
    const [board, setBoard] = useState<Array<Array<number>>>([]);
    const [lowestTiles, setLowestTiles] = useState<Array<number>>([]);
    const [winningSeq, setWinningSeq] = useState<Array<Array<number>>>([]);

    useEffect(() => {
            ws.current = new WebSocket(props.WS_URL);
            
            ws.current.onopen = () => {};
            ws.current.onclose = () => {};
            ws.current.onmessage = (e) => {
                    const data:Message = JSON.parse(e.data);
                    if(data.game_active != gameState){
                        setGameState(data.game_active);
                    }
                    switch(data.type){
                        case "room-id":
                            setRoomId(data.message);
                            break;
                        case "start":
                            setRoomId(data.message);

                            setPlayerOne(data.player_one);
                            setPlayerTwo(data.player_two);

                            setPlayer(data.player);

                            setBoard(data.board);
                            setLowestTiles(data.lowest_tiles);

                            setTurn(data.turn);
                            setWinningSeq(data.winning_sequence);
                            break;
                        case "viewer_join":
                            console.log(data.message);
                            break;                            
                        case "fatal_error":
                            navigate('/');
                            ws.current?.close();
                            window.alert(data.message);
                            break;                            
                        case "error":
                            console.log('ERROR: ', data.message);
                            break;
                        case "play":
                            setBoard(data.board);
                            setLowestTiles(data.lowest_tiles);
                            
                            setTurn(data.turn);
                            setWinningSeq(data.winning_sequence);
                            if(data.game_won)
                                setWinner(data.game_winner);
                            break;
                        case "viewer_tip":
                            console.log(`Viewer adviced you to play in the ${data.x}`);
                            break;
                        case "kill":
                            if(data.player < 3){
                                setGameState(false);
                                ws.current?.close();
                            }
                            break;
                        case "viewer_out":
                            console.log(data.message);
                            break;
                        default:
                            console.log(data);
                            break;
                    }
                };
            return () => { ws.current?.close() }
            }, [gameState, navigate, props])

    const value:Context = {
        socket : ws.current,
        player : player,
        playerOne : playerOne,
        playerTwo : playerTwo,
        gameWinner : winner,
        board : board,
        lowestTiles : lowestTiles,
        gameState : gameState,
        roomId : roomId,
        turn : turn,
        winningSeq : winningSeq,
    }

    return (
        <WSContext.Provider value={value}>
            {props.children}
        </WSContext.Provider>
    );
}

export default WebsocketProvider;
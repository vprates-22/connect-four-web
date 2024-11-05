import { createContext, useEffect, useRef, useState } from "react";

interface WebSocketContextParams {
    children:React.ReactNode;
    WS_URL:string;
}

export interface Context {
    socket:WebSocket|null;
    board:Array<Array<number>>;
    gameState:boolean;
    lowestTiles:Array<number>;
    roomId:string;
}

export interface Message {
    type:string;
    message:string;
    height:number;
    width:number;
    player:number;
    game_active:boolean,
    board:Array<Array<number>>,
    lowest_tiles:Array<number>,    
    x:number;
    turn:number;
    game_won:boolean;
    game_winner:number;
    winning_sequence:Array<number>;
}
    
export const WSContext = createContext<Context>();

const WebsocketProvider = ( props:WebSocketContextParams ) => {
    const ws = useRef<WebSocket | null>(null);
    const [roomId, setRoomId] = useState<string>("");
    const [gameState, setGameState] = useState<boolean>(false);
    const [board, setBoard] = useState<Array<Array<number>>>([]);
    const [lowestTiles, setLowestTiles] = useState<Array<number>>([]);

    useEffect(() => {
            ws.current = new WebSocket(props.WS_URL);
            
            ws.current.onopen = () => {console.log("CONNECT")};
            ws.current.onclose = () => {console.log("DISCONNECT")};
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

                            setBoard(data.board);
                            setLowestTiles(data.lowest_tiles);
                            break;
                        case "viewer_join":
                            console.log(data.message);
                            break;                            
                        case "error":
                            console.log('ERROR: ', data.message);
                            break;
                        case "play":
                            setBoard(data.board);
                            setLowestTiles(data.lowest_tiles);
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
            }, [])

    const value:Context = {
        socket : ws.current,
        board : board,
        lowestTiles : lowestTiles,
        gameState : gameState,
        roomId : roomId,
    }

    return (
        <WSContext.Provider value={value}>
            {props.children}
        </WSContext.Provider>
    );
}

export default WebsocketProvider;
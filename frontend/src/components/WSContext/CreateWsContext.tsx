import { createContext, useEffect, useRef, useState } from "react";

interface WebSocketContextParams {
    children:React.ReactNode;
    WS_URL:string;
}

export interface Context {
    socket:WebSocket|null;
    board:Array<Array<number>>;
    gameState:number;
    lowestTiles:Array<number>;
    roomId:string;
}

export interface Message {
    type:string;
    message:string;
    height:number;
    width:number;
    player:number;
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
    const [gameState, setGameState] = useState<number>(0);
    const [board, setBoard] = useState<Array<Array<number>>>([]);
    const [lowestTiles, setLowestTiles] = useState<Array<number>>([]);

    useEffect(() => {
            ws.current = new WebSocket(props.WS_URL);

            let newBoard:Array<Array<number>> = [];
            let newLowestTiles:Array<number> = [];

            ws.current.onopen = () => {console.log("CONNECT")};
            ws.current.onclose = () => {console.log("DISCONNECT")};
            ws.current.onmessage = (e) => {
                    const data:Message = JSON.parse(e.data);
                    switch(data.type){
                        case "room-id":
                            setRoomId(data.message);
                            break;
                        case "start":
                            setGameState(1);

                            newLowestTiles = new Array(data.width).fill(data.height-1)
                            setLowestTiles(newLowestTiles);
    
                            newBoard = new Array(data.height).fill(Array(data.width).fill(0));
                            setBoard(newBoard);
                            break;
                        case "error":
                            break;
                        case "play":
                            const x = data.x;
                            const y = newLowestTiles[x];
                            
                            console.log(x)
                            console.log(y)

                            newBoard = newBoard.map((r, rowIndex) => 
                                r.map((tile, colIndex) => {
                                    if(rowIndex == y && colIndex == x)
                                        return data.player;
                                    return tile;
                                })
                            )
                            setBoard(newBoard);

                            newLowestTiles = newLowestTiles.map((lowest, colIndex) => {
                                if(colIndex === x)
                                    return lowest - 1;
                                return lowest;
                            });
                            setLowestTiles(newLowestTiles);
                            
                            console.log(newBoard)
                            break;
                        case "kill":
                            if(data.player < 3){
                                setGameState(-1);
                                ws.current?.close();
                            }
                            break;
                        default:
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
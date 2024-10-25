import { createContext, useEffect, useRef, useState } from "react";

type WebSocketContextParams = {
    children:React.ReactNode;
    WS_URL:string;
}

export type Context = {
    socket:WebSocket|null;
    board:Array<Array<number>>;
    gameState:number;
    lowestTiles:Array<number>;
    roomId:string;
}

export type Message = {
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
                            
                            setLowestTiles(Array(data.width).fill(data.height-1));

                            setBoard(Array(data.height).fill(
                                Array(data.width).fill(0)
                            ));
                            break;
                        case "error":
                            break;
                        case "play":
                            const x = data.x;
                            const y = lowestTiles[x];
                            
                            const newBoard = board.map((r, rowIndex) => 
                                r.map((tile, colIndex) => {
                                    if(rowIndex == y && colIndex == x)
                                        return data.player;
                                    return tile;
                                })
                            )
                            setBoard(newBoard);

                            const newLowestTiles = lowestTiles.map((lowest, colIndex) => {
                                if(colIndex === x)
                                    return lowest--;
                                return lowest;
                            });
                            setLowestTiles(newLowestTiles);
                            
                            break;
                        case "kill":
                            setGameState(-1);
                            
                            ws.current?.close();
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
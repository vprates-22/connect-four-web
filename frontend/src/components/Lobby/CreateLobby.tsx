import { createContext } from "react";

import { BoardParams, Message } from '../Game/Board';

const CreateLobby = (props:BoardParams) => {
    const socket:WebSocket = new WebSocket(
        'ws://localhost:8000/ws/create/'
        + props.height + '/'
        + props.width + '/'
    );

    socket.onmessage = (e) => {
        const data:Message = JSON.parse(e.data);
        console.log(data);
        switch(data.type){
            case 'room-id':
                room_id.current = data.message;
                break;
            case 'start':
                if(data.player == 2){
                    console.log()
                }
                break;
            case 'kill':
                socket.close();
                break;
            default:
                break;
        }
    }
 
    return(
        <>
        <div className="WaitingRoom">
            <div className="RoomId">{room_id.current}</div>
        </div>
        </>
    );
}

export default CreateLobby;
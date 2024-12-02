import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ROOM_KEY_MAX_LENGTH } from "../../constants";

const JoinLounge = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();

    useEffect(() => {
        if(roomId?.length !== ROOM_KEY_MAX_LENGTH){
            navigate('/');
            return;
        }
        const ws_url = `ws://127.0.0.1:8000/ws/join/${roomId}/`;
        navigate('/play/', { state : { ws_url }});
        return;
    }, [roomId, navigate]);

    return(
        <>
        </>
    );
}

export default JoinLounge;
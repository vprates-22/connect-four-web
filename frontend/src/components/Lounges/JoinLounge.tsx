import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ROOM_KEY_MAX_LENGTH } from "../../constants";
import { useAuth } from "../Context/AuthContext";

const JoinLounge = () => {
    const { isAuth, token } = useAuth();

    const navigate = useNavigate();
    const { roomId } = useParams();

    useEffect(() => {
        if(roomId?.length !== ROOM_KEY_MAX_LENGTH){
            navigate('/');
            return;
        }

        if(!isAuth){
            navigate('/login/');
            return;
        }

        const ws_url = `ws://127.0.0.1:8000/ws/join/${roomId}/${token}/`;
        navigate('/play/', { state : { ws_url }});
        return;
    }, [roomId, navigate, isAuth, token]);

    return(
        <>
        </>
    );
}

export default JoinLounge;
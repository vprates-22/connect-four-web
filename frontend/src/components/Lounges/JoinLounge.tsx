import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ROOM_KEY_MAX_LENGTH } from "../../constants";
import { AuthContext } from "../Context/LoginContext";

const JoinLounge = () => {
    const auth = useContext(AuthContext);

    const navigate = useNavigate();
    const { roomId } = useParams();

    console.log(auth)
    console.log(roomId)

    useEffect(() => {
        if(roomId?.length !== ROOM_KEY_MAX_LENGTH){
            navigate('/');
            return;
        }

        if(auth.token === null){
            navigate('/login/');
            return;
        }

        const ws_url = `ws://127.0.0.1:8000/ws/join/${roomId}/${auth.token}/`;
        navigate('/play/', { state : { ws_url }});
        return;
    }, [roomId, navigate, auth.token]);

    return(
        <>
        </>
    );
}

export default JoinLounge;
import WebsocketProvider from "../../components/WSContext/CreateWsContext";
import RoomInformer from "../../components/Waiting/WaitingCreate"

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PlayingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const hasState = (location.state && Object.keys(location.state).length > 0);
      
    useEffect(() => {
        if (!hasState) {
          navigate('/');
          return;
        }
    }, [hasState, navigate]);
    
    let url = "";
    if(hasState){
        let { ws_url } = location.state as {ws_url:string};
        url = ws_url;
    }
    
    return (
        <WebsocketProvider WS_URL={url}>
            <RoomInformer/>
        </WebsocketProvider>
    );
}

export default PlayingPage;
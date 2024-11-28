import WebsocketProvider from "../../components/Context/CreateWsContext";
import CreateLounge from "../../components/Lounges/CreateLounge"

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const GamePage = () => {
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

    // ensure that the user is redirected to the Home Page on page refresh
    window.history.replaceState({}, '');

    return (
        <WebsocketProvider WS_URL={url}>
            <CreateLounge/>
        </WebsocketProvider>
    );
}

export default GamePage;
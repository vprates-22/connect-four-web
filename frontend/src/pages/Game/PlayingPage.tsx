import WebsocketProvider from "../../components/WSContext/CreateWsContext";
import RoomInformer from "../../components/Waiting/WaitingCreate"

const PlayingPage = () => {
    const ws_url = "ws://127.0.0.1:8000/ws/create/8/10/"

    return (
        <WebsocketProvider WS_URL={ws_url}>
            <RoomInformer/>
        </WebsocketProvider>
    );
}

export default PlayingPage;
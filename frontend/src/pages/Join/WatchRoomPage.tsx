import ContextWrappedNavBar from "../../components/NavBar/ContextWrappedNavBar";
import WatchPopUp from "../../components/PopUp/WatchPopUp";

const WatchRoomPage = () => {
    return (
        <main>
            <ContextWrappedNavBar/>
            <WatchPopUp open={true} closeButton={false} onClose={() => {}}/>
        </main>
    );
}

export default WatchRoomPage;
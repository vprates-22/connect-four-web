import NavBar from "../../components/NavBar/NavBar";
import WatchPopUp from "../../components/PopUp/WatchPopUp";

const WatchRoomPage = () => {
    return (
        <main>
            <NavBar/>
            <WatchPopUp open={true} closeButton={false} onClose={() => {}}/>
        </main>
    );
}

export default WatchRoomPage;
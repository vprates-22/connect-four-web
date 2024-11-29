import ContextWrappedNavBar from "../../components/NavBar/ContextWrappedNavBar";
import CreatePopUp from "../../components/PopUp/CreatePopUp";

const CreateRoomPage = () => {
    return (
        <main>
            <ContextWrappedNavBar/>
            <CreatePopUp open={true} closeButton={false} onClose={() => {}}/>
        </main>
    );
}

export default CreateRoomPage;
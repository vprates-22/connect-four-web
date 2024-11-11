import NavBar from "../../components/NavBar/NavBar"; 
import CreatePopUp from "../../components/PopUp/CreatePopUp";

const CreateRoomPage = () => {
    return (
        <main>
            <NavBar/>
            <CreatePopUp open={true} closeButton={false} onClose={() => {}}/>
        </main>
    );
}

export default CreateRoomPage;
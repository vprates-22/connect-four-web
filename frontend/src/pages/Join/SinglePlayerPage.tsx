import NavBar from "../../components/NavBar/NavBar";
import SinglePlayerPopUp from "../../components/PopUp/SinglePlayerPopUp";

const SinglePlayerPage = () => {
    return (
        <main>
            <NavBar/>
            <SinglePlayerPopUp open={true} closeButton={false} onClose={() => {}}/>
        </main>
    );
}

export default SinglePlayerPage;
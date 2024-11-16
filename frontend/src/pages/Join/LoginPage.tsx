import NavBar from "../../components/NavBar/NavBar";
import LoginPopUp from "../../components/PopUp/LoginPopUp";

const LoginPage = () => {
    return (
        <>
        <NavBar/>
        <LoginPopUp open={true} closeButton={false}
        onClose={() => {}}/>
        </>
    );
}

export default LoginPage;
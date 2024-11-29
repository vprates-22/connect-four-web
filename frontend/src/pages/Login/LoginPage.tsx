import ContextWrappedNavBar from "../../components/NavBar/ContextWrappedNavBar";
import LoginPopUp from "../../components/PopUp/LoginPopUp";

const LoginPage = () => {
    return (
        <>
            <ContextWrappedNavBar/>
            <LoginPopUp open={true} closeButton={false}
            onClose={() => {}}/>
        </>
    );
}

export default LoginPage;
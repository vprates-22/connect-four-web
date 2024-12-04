import { useNavigate } from "react-router-dom";
import ContextWrappedNavBar from "../../components/NavBar/ContextWrappedNavBar";
import LoginPopUp from "../../components/PopUp/LoginPopUp";

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <ContextWrappedNavBar/>
            <LoginPopUp open={true} closeButton={false}
            doAfterAuth={() => {navigate('/')}} onClose={() => {}}/>
        </>
    );
}

export default LoginPage;
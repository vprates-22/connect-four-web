import { useNavigate } from "react-router-dom";
import LoginPopUp from "../../components/PopUp/LoginPopUp";
import NavBar from "../../components/NavBar/NavBar";

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <NavBar/>
            <LoginPopUp open={true} closeButton={false}
            doAfterAuth={() => {navigate('/')}} onClose={() => {}}/>
        </>
    );
}

export default LoginPage;
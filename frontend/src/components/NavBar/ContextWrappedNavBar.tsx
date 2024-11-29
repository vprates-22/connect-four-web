import AuthProvider from "../Context/LoginContext"
import NavBar from "./NavBar"

const ContextWrappedNavBar = () => {
    return (
        <AuthProvider>
            <NavBar/>
        </AuthProvider>
    )
}

export default ContextWrappedNavBar;
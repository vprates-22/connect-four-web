import { useNavigate } from "react-router-dom";

import "./NavBar.css";
import { useAuth } from "../Context/AuthContext";

const NavBar = () => {
    const navigate = useNavigate();
    const { isAuth, username, logOut } = useAuth();

    return (
        <>
        <nav className='NavBar'>
            <a className='HomeNavBar' id='HomeNavBar' onClick={() => navigate('/')}>
                <img id='HomeImg' src='/HomeLogo.png'></img>
            </a>
            <a className='OptionNavBar' id='PlayNavBar' onClick={() => navigate('/create+room/')}>Play</a>
            <a className='OptionNavBar' id='WatchNavBar' onClick={() => navigate('/watch+room/')}>Watch</a>
            <a className='OptionNavBar' id='AboutNavBar' onClick={() => navigate('/about/')}>About</a>
        
            {
                isAuth ?
                <a className='UserNavBar' id='LoginNavBar' onClick={logOut}>{username}</a> :
                <a className='OptionNavBar' id='LoginNavBar' onClick={() => navigate('/login/')}>Log In</a>
            }
        </nav>
        </>
    )
}

export default NavBar;
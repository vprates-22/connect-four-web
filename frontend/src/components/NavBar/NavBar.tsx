import { useNavigate } from "react-router-dom";

import "./NavBar.css";
import { useContext } from "react";
import { AuthContext } from "../Context/LoginContext";

const NavBar = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

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
                auth.username === null ?
                <a className='OptionNavBar' id='LoginNavBar' onClick={() => navigate('/login/')}>Log In</a>
                : <a className='UserNavBar' id='LoginNavBar' onClick={auth.logOut}>{auth.username}</a>
            }
        </nav>
        </>
    )
}

export default NavBar;
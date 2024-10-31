import { useNavigate } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <>
        <nav className='NavBar'>
            <a className='HomeNavBar' id='HomeNavBar' onClick={() => navigate('/')}>
                <img id='HomeImg' src='/HomeLogo.png'></img>
            </a>
            <a className='OptionNavBar' id='PlayNavBar' onClick={() => navigate('/create+room/')}>Play</a>
            <a className='OptionNavBar' id='WatchNavBar' onClick={() => navigate('/watch')}>Watch</a>
            <a className='OptionNavBar' id='AboutNavBar' onClick={() => navigate('/about')}>About</a>
            <a className='OptionNavBar' id='LoginNavBar' onClick={() => navigate('/login')}>Login</a>
        </nav>
        </>
    )
}

export default NavBar;
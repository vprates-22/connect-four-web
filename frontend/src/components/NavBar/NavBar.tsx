import './NavBar.css'

const NavBar = () => {
    return (
        <div className='NavBar'>
            <a className='OptionNavBar' id='HomeNavBar' href='/'>Home</a>
            <a className='OptionNavBar' id='PlayNavBar' href='/play'>Play</a>
            <a className='OptionNavBar' id='WatchNavBar' href='/watch'>Watch</a>
            <a className='OptionNavBar' id='AboutNavBar' href='/about'>About</a>
            <a className='OptionNavBar' id='LoginNavBar' href='/login'>Login</a>
        </div>
    )
}

export default NavBar;
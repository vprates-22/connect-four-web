import './SwitchPopUpHeader.css'

interface SwitchPopUpHeaderParams{
    logInSelected:boolean;
    setLogInSelected(selected:boolean):void;
}

const SwitchPopUpHeader = ( props:SwitchPopUpHeaderParams ) => {
    const {logInSelected, setLogInSelected} = props;
    
    return (
        <div className="SwitchPopUpHeader">
            <div className='SwitchLine'>
                <button className='SwitchButton' id={logInSelected ? 'LogInButton' : 'RightUnselectedButton'} onClick={() => {setLogInSelected(true)}}>Log In</button>
                <button className='SwitchButton' id={logInSelected ? 'LeftUnselectedButton' : 'SignUpButton'} onClick={() => {setLogInSelected(false)}}>Sign Up</button>
            </div>
        </div>
    );
}

export default SwitchPopUpHeader;
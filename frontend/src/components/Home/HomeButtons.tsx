import { useNavigate } from 'react-router-dom';
import CreatePopUp from '../PopUp/CreatePopUp';

import './HomeButtons.css'
import { useState } from 'react';

const HomeButtons = () => {
    const navigate = useNavigate();

    const [playPopUp, setPlayPopUp] = useState(false);

    return (
    <>
        <CreatePopUp/>
        <div className='HomeButtons'>
            <button className='OptionButton' id='Play' onClick={() => navigate('/play')}>Play</button>
            <div className='divider'></div>
            <button className='OptionButton' id='Watch' onClick={() => navigate('/watch')}>Watch</button>
        </div>
    </>
    );
}

export default HomeButtons;
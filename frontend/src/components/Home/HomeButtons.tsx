import { useNavigate } from 'react-router-dom';

import './HomeButtons.css'

const HomeButtons = () => {
    const navigate = useNavigate();

    return (
    <div className='HomeButtons'>
        <button className='OptionButton' id='Play' onClick={() => navigate('/play')}>Play</button>
        <div className='divider'></div>
        <button className='OptionButton' id='Watch' onClick={() => navigate('/watch')}>Watch</button>
    </div>
    );
}

export default HomeButtons;
import './HomeButtons.css'

const HomeButtons = () => {
    return (
    <div className='HomeButtons'>
        <button className='OptionButton' id='Play'>Play</button>
        <div className='divider'></div>
        <button className='OptionButton' id='Watch'>Watch</button>
    </div>
    );
}

export default HomeButtons;
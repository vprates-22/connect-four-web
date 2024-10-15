import "./HomeButtons.css";

type HomeButtonsParams = {
    setCreatePopUpOpen:() => void;
    setWatchPopUpOpen:() => void;
}

const HomeButtons = (props:HomeButtonsParams) => {
    return (
    <>
        <div className='HomeButtons'>
            <button className='OptionButton' 
            id='Play' onClick={props.setCreatePopUpOpen}>
                Play
            </button>
            <div className='divider'></div>
            <button className='OptionButton' 
            id='Watch' onClick={props.setWatchPopUpOpen}>
                Watch
            </button>
        </div>
    </>
    );
}

export default HomeButtons;
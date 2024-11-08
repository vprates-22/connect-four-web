import './OpenPopUpButton.css'

interface OpenPopUpButtonParams {
    idName:string;
    insideText:string;
    setPopUpOpen:() => void;
}

const OpenPopUpButton = (props:OpenPopUpButtonParams) => {
    return(
        <button className='OptionButton' 
        id={props.idName} onClick={props.setPopUpOpen}>
            {props.insideText}
        </button>
    );
}

export default OpenPopUpButton;
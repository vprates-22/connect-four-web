import './OpenPopUpButton.css'

interface OpenPopUpButtonParams {
    idName:string;
    innerText:string;
    setPopUpOpen():void;
}

const OpenPopUpButton = (props:OpenPopUpButtonParams) => {
    return(
        <button className='OptionButton' 
        id={props.idName} onClick={props.setPopUpOpen}>
            {props.innerText}
        </button>
    );
}

export default OpenPopUpButton;
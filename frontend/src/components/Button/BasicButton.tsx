import './BasicButton.css'

interface BasicButtonParams{
    idName:string;
    innerText:string;
    handleClick:() => void;
}

const BasicButton = (props:BasicButtonParams) => {
    return(
        <button className='BasicButton'
        id={props.idName} onClick={props.handleClick}>
            {props.innerText}
        </button>
    );
}

export default BasicButton;
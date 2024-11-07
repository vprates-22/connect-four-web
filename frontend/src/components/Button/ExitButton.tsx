import { useNavigate } from "react-router-dom";

import './ExitButton.css'

interface ExitButtonParams{
    idName:string;
    text:string;
    redirectPath:string;
}

const ExitButton = (props:ExitButtonParams) => {
    const navigate = useNavigate();

    return(
        <button className="ExitButton" id={props.idName} type='submit' 
        onClick={() => {navigate(props.redirectPath)}}>
            {props.text}
        </button>
    );
}

export default ExitButton;
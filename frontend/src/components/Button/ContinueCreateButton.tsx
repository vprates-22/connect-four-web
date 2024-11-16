import { useNavigate } from 'react-router-dom';

import './ContinueCreateButton.css'

interface ContinueButtonParams{
    idName:string;
    innerText:string;
    condition:boolean;
    toPath:string;
    wsUrl:string;
}

const ContinueButton = (props:ContinueButtonParams) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if(!props.condition)
            return;
        const ws_url = props.wsUrl;
        navigate( props.toPath, { state : { ws_url } });
    };

    return (
        <button className='ContinueButton' id={props.idName} type='submit' 
        onClick={handleClick}>{props.innerText}</button>
    );
}

export default ContinueButton;
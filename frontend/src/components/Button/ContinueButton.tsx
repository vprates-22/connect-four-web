import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

import './ContinueButton.css'

interface ContinueButtonParams{
    idName:string;
    innerText:string;
    condition:boolean;
    toPath:string;
    wsUrl:string;
}

const ContinueButton = (props:ContinueButtonParams) => {
    const navigate = useNavigate();
    const { token } = useAuth();

    const handleClick = () => {
        if(!props.condition)
            return;

        const ws_url = props.wsUrl + token + '/';
        navigate( props.toPath, { state : { ws_url } });
    };

    return (
        <>
            <button className='ContinueButton' id={props.idName}
            onClick={handleClick}>{props.innerText}</button>
        </>
    );
}

export default ContinueButton;
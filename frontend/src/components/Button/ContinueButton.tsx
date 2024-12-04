import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/LoginContext';
import { useContext } from 'react';

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
    const auth = useContext(AuthContext);
    
    const handleClick = () => {

        if(!props.condition)
            return;

        if(auth.token === null){
            navigate('/login/');
            return;
        }

        const ws_url = props.wsUrl + auth.token + '/';
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
import { useNavigate } from 'react-router-dom';
import './LoginButton.css'

// interface Credentials{
    
// }

interface SaveButtonParams{
    idName:string;
    innerText:string;
    emailAdress:string;
    password:string;
    // credentials:
}

const SaveButton = (props:SaveButtonParams) => {
    const navigate = useNavigate();

    const logIn = async () => {
        const response = await fetch("http://localhost:8000/api_auth/login",   {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "your-token-here",
            },
            body : JSON.stringify({
                email : props.emailAdress,
                password : props.password
            })
        });

        if(response.status < 300){
            const auth = await response.json();

            localStorage.setItem('Token', auth.token);
            localStorage.setItem('User', auth.user.username);
            localStorage.setItem('Email', auth.user.email);

            navigate('/');
        } else {
            console.log();
        }
    }

    return(
        <button className='SaveButton' 
        id={props.idName} onClick={logIn}>
            {props.innerText}
        </button>
    );
}

export default SaveButton;
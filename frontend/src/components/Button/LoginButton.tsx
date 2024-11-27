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
    const logIn = async () => {
        const test = await (await fetch("http://localhost:8000/api_auth/login",   {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "your-token-here",
            },
            body : JSON.stringify({
                email : props.emailAdress,
                password : props.password
            })
        })).json();

        console.log(test);
    }

    return(
        <button className='SaveButton' 
        id={props.idName} onClick={logIn}>
            {props.innerText}
        </button>
    );
}

export default SaveButton;
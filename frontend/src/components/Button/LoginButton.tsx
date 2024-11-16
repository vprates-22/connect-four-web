import './LoginButton.css'

interface Credentials{
    
}

interface SaveButtonParams{
    idName:string;
    innerText:string;
    credentials:
}

const SaveButton = (props:SaveButtonParams) => {
    const logIn = () => {
        console.log("A_A")
    }

    return(
        <button className='SaveButton' 
        id={props.idName} onClick={logIn}>
            {props.innerText}
        </button>
    );
}

export default SaveButton;
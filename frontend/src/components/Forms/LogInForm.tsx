import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "../Button/BasciButton";

const LogInForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    const logIn = () => {
        if(!(email && password)) return;
        
        fetch("http://localhost:8000/api_auth/login", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                email : email,
                password : password
            })
        }).then(response => response.json())
        .then(data => {
            localStorage.setItem('Token', data.token);
            localStorage.setItem('User', data.user.username);
            localStorage.setItem('Email', data.user.email);
    
            navigate('/');
        }).catch(error => {
            console.log(error);
        });
    }

    const handleEnter = (e) => {
        if( e.code === "Enter" ){
            logIn();
        }
    }

    return (
    <>
        <form className='LoginForm' onSubmit={logIn}>
            <div className='LoginLineParams'>
                <label className='LoginLabel'>Email Adress</label>
                <input type='text' className='LoginTextInput'
                placeholder="me@example.com"
                maxLength={128}
                onChange={(e) => {setEmail(e.target.value)}}
                onKeyDown={handleEnter}/>
            </div>

            <div className='LoginLineParams'>
                <label className='LoginLabel'>Password</label>
                <input type='password' className='LoginTextInput'
                placeholder="Password"
                maxLength={32}
                onChange={(e) => {setPassword(e.target.value)}}
                onKeyDown={handleEnter}/>
            </div>
            
            <div className="LoginHelp">
                <a className="PasswordRetrive" href="/">Forgot my Password</a> 
            </div>
        </form>
        <BasicButton idName="LoginSaveButton" innerText="Login" handleClick={logIn}/>    
    </>
    );
}

export default LogInForm;
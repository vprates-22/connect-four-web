import { useState } from "react";
import BasicButton from "../Button/BasicButton";
import { useAuth } from "../Context/AuthContext";

import './AuthForms.css';

const LogInForm = () => {
    const { logIn } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submitCredentials = async () => {
        await logIn({
            email : email,
            password : password
        })
    }

    const handleEnter = async (e:React.KeyboardEvent<HTMLInputElement>) => {
        if( e.code === "Enter" ){
            await submitCredentials();
        }
    }

    return (
    <>
        <div className='LoginForm' onSubmit={submitCredentials}>
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
            
            {/* <div className="LoginHelp">
                <a className="PasswordRetrive" href="/">Forgot my Password</a> 
            </div> */}
        </div>
        <BasicButton idName="LoginSaveButton" innerText="Log In" handleClick={submitCredentials}/>    
    </>
    );
}

export default LogInForm;
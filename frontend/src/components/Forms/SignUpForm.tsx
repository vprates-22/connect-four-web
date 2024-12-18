
import { useState } from 'react';
import BasicButton from '../Button/BasicButton';
import { useAuth } from '../Context/AuthContext';
import './AuthForms.css'

const SignUpForm = () => {
    const { signUp } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submitCredentials = async () => {
        await signUp({
            email : email,
            username : username,
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
                <label className='LoginLabel'>Username</label>
                <input type='text' className='LoginTextInput'
                placeholder="MyUserName"
                maxLength={32}
                onChange={(e) => {setUsername(e.target.value)}}
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
        </div>
        <BasicButton idName="LoginSaveButton" innerText="Sign Up" handleClick={submitCredentials}/>    
    </>
    );
}

export default SignUpForm;
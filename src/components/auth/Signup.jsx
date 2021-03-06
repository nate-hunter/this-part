import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth';

/*
 * Set up form validation
 * Handle duplicate usernames in Hasura DB 
 */

const SignUp = () => {

    const { authState, signInWithGoogle, signUpWithEmailAndPassword } = useContext(AuthContext);
    const [userValues, setUserValues] = useState({
        username: '',
        fullname: '',
        email: '',
        password: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [errorMsgGoogle, setErrorMsgGoogle] = useState('');
    const history = useHistory();

    const handleChange = e => {
        const { name, value } = e.target;
        setUserValues(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await signUpWithEmailAndPassword(userValues);
            history.push('/');
        } catch (error) {
            setErrorMsg(error.message);
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            setTimeout(() => history.push("/"), 100);
        } catch (error) {
            console.error(error);
            setErrorMsgGoogle(error.mesage)
        }
    }
    return (
        <div>
            <div className='formContainer'>
                <span className='formTitle'>this pArt</span>
                <p>Sign up to see posts of public art pieces from around the world.</p>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='formItem'>
                        <label>Email</label>
                        <input type="text" placeholder="Email..." name='email' value={userValues.email} onChange={handleChange} />
                    </div>
                    <div className='formItem'>
                        <label>Full Name</label>
                        <input type="text" placeholder="Full Name..." name='fullname' value={userValues.fullname} onChange={handleChange} />
                    </div>
                    <div className='formItem'>
                        <label>Username</label>
                        <input type="text" placeholder="Username..." name='username' value={userValues.username} onChange={handleChange} />
                    </div>
                    <div className="formItem">
                        <label>Password</label>
                        <input type="password" placeholder="Password..." name='password' value={userValues.password} onChange={handleChange} />
                    </div>
                    <button className='loginBtn'>Signup</button>
                </form>
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                <p>- or -</p>
                <button type="submit" className='loginGoogleBtn' onClick={handleGoogleLogin}>Signin w/Google</button>
                {errorMsgGoogle && <p style={{ color: 'red' }}>{errorMsgGoogle}</p>}

                <div className="bot-container">
                    <span className="bot-text">Already signed up?</span>
                    <Link to='/accounts/login'>
                        <button className='signupBtn'>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;

import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth';
import SEO from '../components/shared/Seo';
import isEmail from 'validator/lib/isEmail';

import './pages.css';
import { useApolloClient } from '@apollo/client';
import { GET_USER_EMAIL } from '../graphql/queries';

const Login = () => {

    const { authState, loginWithEmailAndPassword, signInWithGoogle } = useContext(AuthContext);
    const [userValues, setUserValues] = useState({
        input: '',
        password: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [errorMsgGoogle, setErrorMsgGoogle] = useState('');
    const history = useHistory();
    const client = useApolloClient();

    const getUserEmail = async input => {
        const { data } = await client.query({
            query: GET_USER_EMAIL,
            variables: { username: input }
        })
        return data.users[0]?.email || 'emailNotFound@nope.com';
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setUserValues(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        let { input, password } = userValues;
        try {
            if (!isEmail(input)) {
                input = await getUserEmail(input);
            }
            await loginWithEmailAndPassword(input, password);
            setTimeout(() => history.push("/"), 100);
        } catch (error) {
            setErrorMsg(error.message)
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
        <>
            <SEO title='Login' />
            <div className='formContainer'>
                <span className='formTitle'>this pArt</span>
                <p>Please Login</p>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='formItem'>
                        <label>Username or Email</label>
                        <input type="text" placeholder="Username or Email..." name='input' value={userValues.input} onChange={handleChange} />
                    </div>
                    <div className="formItem">
                        <label>Password</label>
                        <input type="password" placeholder="Password..." name='password' value={userValues.password} onChange={handleChange} />
                    </div>
                    <button type='submit' className='loginBtn'>Login</button>
                </form>
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                <p>- or -</p>

                <button className='loginGoogleBtn' onClick={handleGoogleLogin}>Login w/Google</button>
                {errorMsgGoogle && <p style={{ color: 'red' }}>{errorMsgGoogle}</p>}

                <div>
                    <p>------------------------</p>
                    <p>Not signed up?</p>
                    <Link to='/accounts/signup'>
                        <button className='signupBtn'>Sign Up</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Login;

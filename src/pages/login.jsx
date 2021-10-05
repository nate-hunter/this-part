import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/shared/Seo';

import './pages.css';

const login = () => {
    return (
        <>
            <SEO title='Login' />
            <div className='formContainer'>
                <span className='formTitle'>this pArt</span>
                <p>Please Login</p>
                <form className='form'>
                    <div className='formItem'>
                        <label>Username</label>
                        <input type="text" placeholder="Username..." />
                    </div>
                    <div className="formItem">
                        <label>Password</label>
                        <input type="password" placeholder="Password..." />
                    </div>
                    <button className='loginBtn'>Login</button>
                </form>
                <p>- or -</p>
                <button className='loginGoogleBtn'>Login w/Google</button>

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

export default login;

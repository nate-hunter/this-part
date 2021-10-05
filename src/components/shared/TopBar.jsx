import React from 'react';
import { Link } from 'react-router-dom';
import './shared.css';


/* This horizontal top navbar will contain:
    - The app's name (or logo) inthe upper left hand corner  ->  links to the homepage
    - Username + avatar  ->  links to the user's profile page 
    - Authorization status in the upper right corner  ->  links to the login or logout depending on status  
    - An animated loading bar at the top using '@tanem/react-nprogress'
    - Notifications  (if/when Notifications are set up)
*/
const TopBar = () => {

    let user = 'test panda';

    const handleLogout = () => {
        console.log('handle logout in topbar')
    }

    return (
        <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Link to='/' className='link'>
                        <span className="logo">this p.Art</span>
                    </Link>
                    <Link to='/map' className='link'>
                        <span className='topBarItem'>Map</span>
                    </Link>
                    <Link to='/gallery' className='link'>
                        <span className='topBarItem'>Gallery</span>
                    </Link>
                    <Link to='/about' className='link'>
                        <span className='topBarItem'>About</span>
                    </Link>
                </div>
                <div className="topCenter">
                    {/* <span className="header-sub-txt">( kēia version )</span> */}
                    <span className="header-sub-txt">[ <em>sandbox</em> ]</span>
                </div>
                <div className="topRight">
                    {user ? (
                        <>
                            <span className='topBarAuthItem' onClick={handleLogout}>Logout</span>
                            <span className='topBarAuthItem'>{user}'s avatar</span>
                        </>
                    ) :
                        <>
                            <span className='topBarAuthItem'>Login</span>
                            <span className='topBarAuthItem'>Signup</span>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default TopBar;

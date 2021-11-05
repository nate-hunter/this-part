import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { UserContext } from '../../../App';
import { AuthContext } from '../../../auth';
import Context from '../../../context';
import './topBar.css';


/* This horizontal top navbar will contain:
    - The app's name (or logo) inthe upper left hand corner  ->  links to the homepage
    - Username + avatar  ->  links to the user's profile page 
    - Authorization status in the upper right corner  ->  links to the login or logout depending on status  
    - An animated loading bar at the top using '@tanem/react-nprogress'
    - Notifications  (if/when Notifications are used in app)
*/
const TopBar = () => {
    const { signOut } = useContext(AuthContext);
    const { me } = useContext(Context);
    const history = useHistory();
    let user = me;

    const handleLogout = () => {
        setTimeout(() => {
            signOut();
            history.push('/accounts/login')
        }, 100);
    }

    return (
        <div className="topbar">
            <div className="topbar-top">
                <div className="top-left">
                    <Link to='/' className='link'>
                        <span className="logo">this p.Art</span>
                    </Link>
                </div>
                <div>
                    {user
                        ? (
                            <div>
                                <span className='auth-item' onClick={handleLogout}>Logout</span>
                                <Link to={`/${user.username}`} className='link'>
                                    <span className='auth-item user-in'>{user.username}</span>
                                </Link>
                            </div>
                        )
                        : (
                            <div>
                                <span className='auth-item'>Signup</span>
                                <span className='auth-item'>Login</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default TopBar;

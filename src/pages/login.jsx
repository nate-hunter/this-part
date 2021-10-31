import SEO from '../components/shared/Seo';

import './pages.css';
import Login from '../components/auth/Login';

const LoginPage = () => {

    return (
        <>
            <SEO title='Login' />
            <Login />
        </>
    )
}

export default LoginPage;

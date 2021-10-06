import { useContext } from 'react';
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import './App.css';
import { AuthContext } from './auth';

import About from './pages/about.jsx';
import editProfile from './pages/editProfile.jsx';
import gallery from './pages/gallery.jsx';
import landing from './pages/landing.jsx';
import Login from './pages/login.jsx';
import map from './pages/map.jsx';
import notFound from './pages/notFound.jsx';
import post from './pages/post.jsx';
import profile from './pages/profile.jsx';
import SignUp from './pages/signUp.jsx';



function App() {
  const { authState } = useContext(AuthContext);
  const isAuth = authState.status === 'in';

  const history = useHistory();
  const location = useLocation();

  console.log('is auth:', isAuth);
  if (!isAuth) {
    return (
      <Switch>
        <Route path='/accounts/login' component={Login} />
        <Route path='/accounts/signup' component={SignUp} />
        <Redirect to='/accounts/login' />
      </Switch>
    )
  }

  return (
    <>
      <Switch>
        <Route exact path="/" component={landing} />
        <Route path="/gallery" component={gallery} />
        <Route path='/map' component={map} />
        <Route path='/about' component={About} />
        <Route exact path='/:username' component={profile} />
        <Route exact path='/p/:postId' component={post} />
        <Route path='/accounts/edit' component={editProfile} />
        <Route path='/accounts/login' component={Login} />
        {/* <Route path='/accounts/signup' component={SignUp} /> */}
        <Route path='*' component={notFound} />
      </Switch>
    </>
  );
}

export default App;

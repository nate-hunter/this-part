import { useSubscription } from '@apollo/client';
import { createContext, useContext } from 'react';
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';

import './App.css';
import { AuthContext } from './auth';
import Context from './context';
import { ME } from './graphql/subscriptions';

import About from './pages/about.jsx';
import editProfile from './pages/editProfile.jsx';
import gallery from './pages/gallery.jsx';
import landing from './pages/landing.jsx';
import Login from './pages/login.jsx';
import MapPage from './pages/map.jsx';
import notFound from './pages/notFound.jsx';
import post from './pages/post.jsx';
import Profile from './pages/profile.jsx';
import SignUp from './pages/signUp.jsx';


// export const UserContext = createContext();  // Should this be placed in a separate 'context' file?

function App() {
  // 'App' tasks:
  // [] Loading Screen / Skeleton


  const { authState } = useContext(AuthContext);
  const initialState = useContext(Context);
  // console.log(initialState)
  const isAuth = authState.status === 'in';
  const userId = isAuth ? authState.user.uid : null;
  const { data, loading } = useSubscription(ME, { variables: { userId } });
  const me = isAuth && data ? data.users[0] : null;
  const currentUserId = data && me.id;

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
    <Context.Provider value={{ me, currentUserId }}>
      <Switch>
        <Route exact path="/" component={landing} />
        <Route path="/gallery" component={gallery} />
        <Route path='/map' component={MapPage} />
        <Route path='/about' component={About} />
        <Route exact path='/:username' component={Profile} />
        <Route exact path='/p/:postId' component={post} />
        <Route path='/accounts/edit' component={editProfile} />
        <Route path='/accounts/login' component={Login} />
        {/* <Route path='/accounts/signup' component={SignUp} /> */}
        <Route path='*' component={notFound} />
      </Switch>
    </Context.Provider>
  );
}

export default App;

import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import './App.css';
import CreateProfile from './components/profile-forms/CreateProfile';
import PostForm from './components/posts/PostForm';
import Alert from './components/layout/Alert';
import EditProfile from './components/profile-forms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

// Redux imports
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  let showNav = false;
  let darkMode = true;

  return (
    <Provider store={store}>
      <Router>
        <div className={darkMode ? 'dark-overlay' : ''}>
          {showNav && <Navbar />}
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
              <PrivateRoute exact path='/add-post' component={PostForm} />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

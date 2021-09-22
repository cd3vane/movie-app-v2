import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import PropTypes from 'prop-types';
import Register from './components/auth/Register';
import './App.css';
import CreateProfile from './components/profile-forms/CreateProfile';
import Alert from './components/layout/Alert';
import EditProfile from './components/profile-forms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Movies from './components/movies/Movies';

// Redux imports
import { connect } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App({ isAuthenticated }) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const showNav = isAuthenticated;
  let darkMode = true;

  return (
    <Router>
      <div className={darkMode ? 'dark-overlay' : ''}>
        {showNav && <Navbar />}
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/movies' component={Movies} />
            <Route exact path='/profiles' component={Profiles} />
            <Route exact path='/profile/:id' component={Profile} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          </Switch>
        </section>
      </div>
    </Router>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(App);

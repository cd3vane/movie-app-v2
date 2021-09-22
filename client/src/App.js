import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

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

  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Landing} />
        {showNav && <Navbar />}
        <section className='container'>
          <Route exact path='/register' component={Register} />
        </section>
      </Router>
    </Provider>
  );
}

export default App;

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';
import './App.css';
import { LOGOUT } from './actions/types';

// Redux imports
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
store.dispatch(loadUser());

// log user out from all tabs if they log out in one tab
window.addEventListener('storage', () => {
  if (!localStorage.token) store.dispatch({ type: LOGOUT });
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

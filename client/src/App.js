import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import MyRoutes from './components/routing/MyRoutes';
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
          <Routes>
            <Route exact path='/' component={Landing} />
            <Route component={MyRoutes} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

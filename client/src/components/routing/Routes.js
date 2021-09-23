import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import MovieList from '../movies/MovieList';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import MovieDetails from '../movie/MovieDetails';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/movies/:pageNumber' component={MovieList} />
        <PrivateRoute
          exact
          path='/movie-details/:id'
          component={MovieDetails}
        />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

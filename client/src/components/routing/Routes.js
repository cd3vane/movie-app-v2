import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import ProfileForm from '../profile-forms/ProfileForm';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Dashboard from '../dashboard/Dashboard';
import PopularMovies from '../movies/PopularMovies';
import SearchMovies from '../movies/SearchMovies';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import MovieDetails from '../movie/MovieDetails';
import Watchlist from '../profile/Watchlist';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/account/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/update-profile' component={ProfileForm} />
        <PrivateRoute
          exact
          path='/movies/:pageNumber'
          component={PopularMovies}
        />
        <PrivateRoute
          exact
          path='/search/:pageNumber'
          component={SearchMovies}
        />
        <PrivateRoute
          exact
          path='/movie-details/:id'
          component={MovieDetails}
        />
        <PrivateRoute exact path='/account/watchlist' component={Watchlist} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

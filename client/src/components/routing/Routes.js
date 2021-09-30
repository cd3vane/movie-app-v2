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
import Lists from '../lists/Lists';
import List from '../list/List';
import UserReviews from '../reviews/UserReviews';
import ReviewForm from '../reviews/ReviewForm';
import Review from '../review/Review';

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
        <PrivateRoute exact path='/account/lists' component={Lists} />
        <PrivateRoute exact path='/account/lists/:list_id' component={List} />
        <Route exact path='/:user_id/reviews' component={UserReviews} />
        <Route exact path='/review/:review_id' component={Review} />
        <PrivateRoute exact path='/add-review' component={ReviewForm} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

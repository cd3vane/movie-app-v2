import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
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
import UserLists from '../lists/UserLists';
import List from '../list/List';
import ListForm from '../list/ListForm';
import UserReviews from '../reviews/UserReviews';
import ReviewForm from '../reviews/ReviewForm';
import Review from '../review/Review';

const MyRoutes = () => {
  return (
    <section className='container'>
      <Alert />
      <Routes>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/account/dashboard' component={Dashboard} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/update-profile' component={ProfileForm} />
        <PrivateRoute exact path='/create-list' component={ListForm} />
        <Route exact path='/movies/:pageNumber' component={PopularMovies} />
        <Route exact path='/search/:page_number' component={SearchMovies} />
        <Route exact path='/movie-details/:id' component={MovieDetails} />
        <Route exact path='/:user_id/lists' component={UserLists} />
        <Route exact path='/lists/:list_id' component={List} />
        <Route exact path='/:user_id/reviews' component={UserReviews} />
        <Route exact path='/review/:review_id' component={Review} />
        <PrivateRoute
          exact
          path='/add-review/:movie_id'
          component={ReviewForm}
        />
        <Route component={NotFound} />
      </Routes>
    </section>
  );
};

export default MyRoutes;

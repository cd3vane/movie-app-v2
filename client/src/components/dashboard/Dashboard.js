import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import DashboardActions from './DashboardActions';
import Watchlist from '../movies/Watchlist';
import { connect } from 'react-redux';
import { getCurrentMovieStats } from '../../actions/movieStats';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentMovieStats,
  getCurrentProfile,
  auth: { user },
  profile,
  movieStats: {
    loading,
    movieStats: { watchlist }
  },
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
    getCurrentMovieStats();
  }, [getCurrentMovieStats, getCurrentProfile]);
  return (
    <Fragment>
      {profile.loading || loading || user === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Dashboard</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome {user.username}
          </p>

          {profile !== null ? (
            <Fragment>
              <DashboardActions user={user} />
              <br />
              <div className='watchlist'>
                <h3>Your Watchlist</h3>{' '}
                <Link to='/account/watchlist'>View more</Link>
                <Watchlist watchlist={watchlist} n={5} />
              </div>
              <div className='my-2'>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteAccount()}
                >
                  <i className='fas fa-user-minus'></i>
                  Delete My Account
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not setup your profile, please add your info</p>
              <Link to='/update-profile' className='btn btn-primary my-1'>
                Create Profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentMovieStats: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  movieStats: state.movieStats
});

export default connect(mapStateToProps, {
  getCurrentMovieStats,
  getCurrentProfile,
  deleteAccount
})(Dashboard);

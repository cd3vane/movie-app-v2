import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import MovieList from '../movies/MovieList';
import PropTypes from 'prop-types';

const Watchlist = ({
  getCurrentProfile,
  watchlist,
  profile: { loading },
  n
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <>
      <Fragment>
        {watchlist === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className='watchlist'>
              {n !== null ? (
                <MovieList movies={watchlist.slice(0, n)} />
              ) : (
                <MovieList movies={watchlist} />
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    </>
  );
};

Watchlist.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Watchlist);

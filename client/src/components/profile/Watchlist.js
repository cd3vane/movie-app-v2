import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import MovieList from '../movies/MovieList';
import PropTypes from 'prop-types';

const Watchlist = ({
  match,
  getProfileById,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <>
      <Fragment>
        {profile === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className='watchlist'>
              <MovieList movies={profile.watchlist} />
            </div>
          </Fragment>
        )}
      </Fragment>
    </>
  );
};

Watchlist.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(Watchlist);

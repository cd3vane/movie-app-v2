import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MovieList from '../movies/MovieList';

const ProfileWatchlist = ({ profile: { watchlist } }) => {
  console.log(watchlist);
  return (
    <Fragment>
      <MovieList movies={watchlist} />
    </Fragment>
  );
};

ProfileWatchlist.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileWatchlist;

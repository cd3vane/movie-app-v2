import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MovieList from '../movies/MovieList';

const PreviewWatchlist = ({ watchlist }) => {
  let slice = watchlist;
  var items = slice.slice(0, 5);
  return (
    <Fragment>
      <MovieList movies={items} />
    </Fragment>
  );
};

PreviewWatchlist.propTypes = {
  watchlist: PropTypes.array.isRequired
};

export default PreviewWatchlist;

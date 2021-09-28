import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../../actions/movieStats';
import PropTypes from 'prop-types';

const MovieActions = ({
  watchlist,
  movie: { id, title },
  addToWatchlist,
  removeFromWatchlist,
  history
}) => {
  useEffect(() => {
    isInWatchlist(watchlist, title);
  });
  const [inWatchlist, setInWatchlist] = useState(false);

  const isInWatchlist = (watchlist, title) => {
    if (watchlist.length > 0) {
      for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].title === title) {
          setInWatchlist(true);
        }
      }
      setInWatchlist(false);
    }
  };
  return (
    <Fragment>
      {inWatchlist ? (
        <button onClick={(e) => removeFromWatchlist(id, history)}>
          Remove from Watchlist
        </button>
      ) : (
        <button onClick={(e) => addToWatchlist(id, history)}>
          Add to Watchlist
        </button>
      )}
    </Fragment>
  );
};

MovieActions.propTypes = {
  addToWatchlist: PropTypes.func.isRequired,
  removeFromWatchlist: PropTypes.func.isRequired
};

export default connect(null, { addToWatchlist, removeFromWatchlist })(
  MovieActions
);

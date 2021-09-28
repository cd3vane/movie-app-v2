import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import MovieList from './MovieList';
import PropTypes from 'prop-types';

const Watchlist = ({ watchlist, n }) => {
  return (
    <>
      <Fragment>
        {watchlist === null ? (
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

Watchlist.propTypes = {};

export default Watchlist;

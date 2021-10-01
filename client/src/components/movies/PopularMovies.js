import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import ViewMovies from './ViewMovies';
import { getPopularMovies } from '../../actions/movie';
import PropTypes from 'prop-types';

const PopularMovies = ({
  match,
  getPopularMovies,
  movie: { movies, loading }
}) => {
  useEffect(() => {
    getPopularMovies(match.params.pageNumber);
  }, [getPopularMovies, match.params.pageNumber]);

  return (
    <>
      <Fragment>
        {loading || movies === null ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className='popular-movies'>
              <ViewMovies movies={movies} />
            </div>
          </Fragment>
        )}
      </Fragment>
    </>
  );
};

PopularMovies.propTypes = {
  getPopularMovies: PropTypes.func.isRequired,
  movies: PropTypes.array
};

const mapStateToProps = (state) => ({
  movie: state.movie
});

export default connect(mapStateToProps, { getPopularMovies })(PopularMovies);

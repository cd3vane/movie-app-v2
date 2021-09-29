import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getMovieById } from '../../actions/movie';
import MovieActions from './MovieActions';
import { getCurrentLists } from '../../actions/lists';
import PropTypes from 'prop-types';

const MovieDetails = ({
  match,
  history,
  movie: { movie, loading },
  getMovieById,
  getCurrentLists,
  movieStats: {
    movieStats: { watchlist }
  },
  movieStats
}) => {
  useEffect(() => {
    getMovieById(match.params.id);
    getCurrentLists();
  }, [getMovieById, getCurrentLists, match.params.id]);
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

  return (
    <Fragment>
      {movie === null || movieStats.loading || loading ? (
        <Spinner />
      ) : (
        <div>
          <Link to='/movies/1'>Back</Link>
          <h1 className='text-center'>{movie.title}</h1>
          <div className='img-container'>
            <img src={`${IMGPATH}${movie.poster_path}`} alt='Movie' />
          </div>
          <h3 className='text-center'>
            Rating: {movie.vote_average}/10 by {movie.vote_count} users
          </h3>
          <h1> Synopsis</h1>
          <p>{movie.overview}</p>
          <MovieActions watchlist={watchlist} movie={movie} />
        </div>
      )}
    </Fragment>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
  getMovieById: PropTypes.func.isRequired,
  getCurrentLists: PropTypes.func.isRequired,
  movieStats: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  movieStats: state.movieStats
});

export default connect(mapStateToProps, {
  getMovieById,
  getCurrentLists
})(MovieDetails);

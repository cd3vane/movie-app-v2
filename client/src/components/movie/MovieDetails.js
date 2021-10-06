import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getMovieById } from '../../actions/movie';
import formatDate from '../../utils/formatDate';
import MovieReviews from '../reviews/MovieReviews';
import PropTypes from 'prop-types';
import MovieActions from './MovieActions';

const MovieDetails = ({
  match,
  auth: { user, isAuthenticated },
  movie: { movie, movieLoading },
  getMovieById
}) => {
  useEffect(() => {
    getMovieById(match.params.id);
  }, [getMovieById, match.params.id]);
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

  return (
    <Fragment>
      {movie === null || movieLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/movies/1'>Back</Link>
          <div className='movie-container movie-grid'>
            <div className='movie-img'>
              <img src={`${IMGPATH}/${movie.poster_path}`} />
            </div>
            <div className='movie-about'>
              <h1 className='large text-primary'>{movie.title}</h1>
              <h3>{movie.tagline}</h3>
              <p>{movie.overview}</p>
            </div>
            <div className='movie-details'>
              <h2 className='large text-primary'>Movie Details</h2>
              {movie.vote_average !== 0 ? (
                <p>
                  Rated <i className='fa fa-star' aria-hidden='true'></i>{' '}
                  {movie.vote_average} / 10 by {movie.vote_count} users.
                </p>
              ) : (
                <p>Movie not yet rated</p>
              )}
              <p>
                Release Date:{' '}
                {movie.release_date ? (
                  <>{formatDate(movie.release_date)}</>
                ) : (
                  <>TBD</>
                )}
                <br />
                Runtime: {movie.runtime !== 0 ? <>{movie.runtime}</> : <>TBD</>}
              </p>
            </div>
            <div className='movie-genres'>
              <h3 className='text-primary'>Genres</h3>
              <div>
                <span>
                  {movie.genres.map((genre, index) => (
                    <div key={index}>{genre.name}</div>
                  ))}
                </span>
              </div>
            </div>
            {isAuthenticated ? (
              <Fragment>
                <MovieActions movie={movie} id={user._id} />
                <div className='movie-reviews'>
                  <MovieReviews id={movie.id} />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <h3>
                  <Link to='/'>Sign in</Link> or
                  <Link to='/register'> Register </Link>
                  to add this movie to a list or write a review{' '}
                </h3>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
  auth: PropTypes.object,
  getMovieById: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getMovieById
})(MovieDetails);

import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getMovieById } from '../../actions/movie';
import formatDate from '../../utils/formatDate';
import MovieButtons from './MovieButtons';
import MovieReviews from '../reviews/MovieReviews';
import { getListsByUser } from '../../actions/lists';
import PropTypes from 'prop-types';

const MovieDetails = ({
  match,
  auth: { user },
  lists: { lists, listsLoading },
  movie: { movie, movieLoading },
  getMovieById,
  getListsByUser
}) => {
  useEffect(() => {
    getMovieById(match.params.id);
    getListsByUser(user._id);
  }, [getMovieById, getListsByUser, match.params.id, user._id, listsLoading]);
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

  const [showButtons, toggleButtons] = useState(false);

  return (
    <Fragment>
      {user === null || movie === null || movieLoading || listsLoading ? (
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
              <p>
                Rated <i className='fa fa-star' aria-hidden='true'></i>{' '}
                {movie.vote_average} / 10 by {movie.vote_count} users.
              </p>
              <p>
                Released: {formatDate(movie.release_date)} <br />
                Runtime: {movie.runtime} minutes
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
            <div className='movie-actions'>
              <div
                className={
                  showButtons
                    ? 'button-list button-list--active btn-rounded'
                    : 'button-list btn-rounded'
                }
              >
                <div
                  onClick={(e) => toggleButtons(!showButtons)}
                  className='button-list__content btn-light'
                >
                  <i className='text-primary fa fa-list' aria-hidden='true'></i>
                  <p className='text-primary'>Toggle List Actions</p>
                </div>
                {showButtons && (
                  <Fragment>
                    {lists.length > 0 ? (
                      <MovieButtons lists={lists} movie={movie} />
                    ) : (
                      <h4>Create a profile to add movies to lists</h4>
                    )}
                  </Fragment>
                )}
              </div>
            </div>

            <div className='movie-reviews'>
              <MovieReviews id={movie.id} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
  getMovieById: PropTypes.func.isRequired,
  getListsByUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  auth: state.auth,
  lists: state.lists
});

export default connect(mapStateToProps, {
  getMovieById,
  getListsByUser
})(MovieDetails);

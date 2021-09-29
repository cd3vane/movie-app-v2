import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getMovieById } from '../../actions/movie';
import MovieButtons from './MovieButtons';
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
  }, [getMovieById, getListsByUser, match.params.id, user._id]);
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

  return (
    <Fragment>
      {movie === null || movieLoading || listsLoading ? (
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
          {lists.length > 0 ? (
            <MovieButtons lists={lists} movie={movie} />
          ) : (
            <h4>Create a profile to add movies to lists</h4>
          )}
        </div>
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

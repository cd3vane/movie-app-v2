import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getMovieById } from '../../actions/movie';
import PropTypes from 'prop-types';

const MovieDetails = ({ match, movie: { movie, loading }, getMovieById }) => {
  useEffect(() => {
    getMovieById(match.params.id);
  }, [getMovieById, match.params.id]);
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

  return (
    <Fragment>
      {movie === null || loading ? (
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
          <button>Add to Watchlist</button>
        </div>
      )}
    </Fragment>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
  getMovieById: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movie: state.movie
});

export default connect(mapStateToProps, { getMovieById })(MovieDetails);

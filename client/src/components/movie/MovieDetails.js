import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getMovieById } from '../../actions/movie';
import { addToWatchlist, getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

const MovieDetails = ({
  match,
  movie: { movie, loading },
  getMovieById,
  addToWatchlist,
  getCurrentProfile,
  profile: { profile }
}) => {
  useEffect(() => {
    getMovieById(match.params.id);
    getCurrentProfile();
  }, [getMovieById, getCurrentProfile, match.params.id]);
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

  return (
    <Fragment>
      {movie === null || profile === null || loading ? (
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
          <button onClick={(e) => addToWatchlist(movie.id)}>
            Add to Watchlist
          </button>
        </div>
      )}
    </Fragment>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
  getMovieById: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  addToWatchlist: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getMovieById,
  addToWatchlist,
  getCurrentProfile
})(MovieDetails);

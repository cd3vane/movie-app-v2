import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getMovieById } from '../../actions/movie';
import { addReview } from '../../actions/review';

const ReviewForm = ({
  match,
  addReview,
  auth: { user },
  history,
  movie: { movie, movieLoading },
  getMovieById
}) => {
  useEffect(() => {
    getMovieById(match.params.movie_id);
  }, [getMovieById, match.params.movie_id]);
  const [text, setText] = useState('');

  return (
    <Fragment>
      {user === null || movie === null || movieLoading ? (
        <Spinner />
      ) : (
        <div className='review-form'>
          <div className='bg-primary p'>
            <h3>Write a review for {movie.title}</h3>
          </div>
          <form
            className='form my-1'
            onSubmit={(e) => {
              e.preventDefault();
              addReview(
                movie.id,
                { title: movie.title, poster_path: movie.poster_path, text },
                history
              );
              setText('');
            }}
          >
            <textarea
              name='text'
              cols='30'
              rows='5'
              placeholder='Create a review'
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <input type='submit' className='btn btn-dark my-1' value='Submit' />
          </form>
        </div>
      )}
    </Fragment>
  );
};

ReviewForm.propTypes = {
  addReview: PropTypes.func.isRequired,
  getMovieById: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  auth: state.auth
});

export default connect(mapStateToProps, { addReview, getMovieById })(
  ReviewForm
);

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deleteReview } from '../../actions/review';

const ReviewItem = ({
  review: {
    _id,
    title,
    poster_path,
    text,
    name,
    movieId,
    avatar,
    user,
    likes,
    comments,
    date
  },
  auth,
  addLike,
  deleteReview,
  removeLike
}) => {
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

  return (
    <div className='review bg-primary p-1 my-1'>
      <div id='images-container'>
        <Link to={`/movie-details/${movieId}`}>
          <img
            src={`${IMGPATH}/${poster_path}`}
            alt='Poster'
            id='poster-image'
          />
        </Link>
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt='user' className='round-img' id='user-image' />
        </Link>
      </div>
      <div>
        <h3 className='text-dark'>{title}</h3>
        <p className='my-1 text-dark'>{text}</p>
        <p className='text-dark'>Reviewed on {formatDate(date)}</p>
        <button
          onClick={(e) => addLike(_id)}
          type='button'
          className='btn btn-dark'
        >
          <i className='fas fa-thumbs-up'></i>{' '}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          onClick={(e) => removeLike(_id)}
          type='button'
          className='btn btn-dark'
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/review/${_id}`} className='btn btn-dark'>
          Discussion{' '}
          {comments.lenth > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => deleteReview(_id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

ReviewItem.propTypes = {
  auth: PropTypes.object.isRequired,
  review: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deleteReview })(
  ReviewItem
);

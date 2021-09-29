import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deleteReview } from '../../actions/review';

const ReviewItem = ({
  review: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  addLike,
  deleteReview,
  removeLike
}) => {
  return (
    <div className='review bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='review-date'>
          Reviewed on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button
          onClick={(e) => addLike(_id)}
          type='button'
          className='btn btn-light'
        >
          <i className='fas fa-thumbs-up'></i>{' '}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          onClick={(e) => removeLike(_id)}
          type='button'
          className='btn btn-light'
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/reviews/${_id}`} className='btn btn-primary'>
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

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import { getReview } from '../../actions/review';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Review = ({ getReview, review: { review, reviewLoading }, match }) => {
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

  useEffect(() => {
    getReview(match.params.review_id);
  }, [getReview, match.params.review_id]);

  return (
    <Fragment>
      {review === null || reviewLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to={`/${review.user}/reviews`} className='btn'>
            Back To Reviews
          </Link>
          <div className='review bg-dark p-1 my-1'>
            <div id='images-container'>
              <Link to={`/movie-details/${review.movieId}`}>
                <img
                  src={`${IMGPATH}/${review.poster_path}`}
                  alt='Poster'
                  id='poster-image'
                />
              </Link>
              <Link to={`/profile/${review.user}`}>
                <img
                  src={review.avatar}
                  alt='user'
                  className='round-img'
                  id='user-image'
                />
              </Link>
            </div>
            <div>
              <h3 className='text-dark'>{review.title}</h3>
              <p className='my-1'>{review.text}</p>
              <p className='review-date'>
                Reviewed on <Moment format='YYYY/MM/DD'>{review.date}</Moment>
              </p>
            </div>
          </div>
          <CommentForm reviewId={review._id} />
          <div className='comments'>
            {review.comments.length > 0 ? (
              review.comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  reviewId={review._id}
                />
              ))
            ) : (
              <h4>No comments found, start a discussion now!</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Review.propTypes = {
  getReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  review: state.review
});

export default connect(mapStateToProps, { getReview })(Review);

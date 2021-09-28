import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import { getReview } from '../../actions/review';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Review = ({ getReview, review: { review, loading }, match }) => {
  useEffect(() => {
    getReview(match.params.id);
  }, [getReview, match.params.id]);
  return (
    <Fragment>
      {review === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/reviews' class='btn'>
            Back To Reviews
          </Link>
          <div class='review bg-white p-1 my-1'>
            <div>
              <Link to={`/profile/${review.user}`}>
                <img class='round-img' src={review.avatar} alt='' />
                <h4>{review.name}</h4>
              </Link>
            </div>
            <div>
              <p class='my-1'>{review.text}</p>
              <p class='review-date'>
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

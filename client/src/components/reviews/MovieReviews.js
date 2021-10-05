import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReviewItem from './ReviewItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getReviewsByMovie } from '../../actions/review';

const MovieReviews = ({
  id,
  getReviewsByMovie,
  review: { reviews, loading }
}) => {
  useEffect(() => {
    getReviewsByMovie(id);
  }, [getReviewsByMovie, id]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Reviews</h1>
      {reviews.length > 0 ? (
        <Fragment>
          <Link to={`/add-review/${id}`} className='btn btn-light'>
            Review this movie
          </Link>
          <div className='reviews'>
            {reviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h4>This movie does not have any reviews yet</h4>
          <Link to={`/add-review/${id}`} className='btn btn-light'>
            Add Review
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

MovieReviews.propTypes = {
  getReviewsByMovie: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  review: state.review,
  profile: state.profile
});

export default connect(mapStateToProps, { getReviewsByMovie })(MovieReviews);

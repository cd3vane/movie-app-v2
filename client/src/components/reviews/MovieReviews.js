import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReviewItem from './ReviewItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getReviewsByMovie } from '../../actions/review';
import review from '../../reducers/review';
import ReviewForm from './ReviewForm';

const Reviews = ({ getReviewsByMovie, review: { reviews, loading } }) => {
  useEffect(() => {
    getReviewsByMovie();
  }, [getReviews]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Reviews</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community
      </p>
      <Link to='/add-review' className='btn btn-light'>
        Create New Review
      </Link>
      <div className='reviews'>
        {reviews.length > 0 && (
          <Fragment>
            {reviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Reviews.propTypes = {
  getReviewsByMovie: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ review: state.review });

export default connect(mapStateToProps, { getReviewsByMovie })(Reviews);

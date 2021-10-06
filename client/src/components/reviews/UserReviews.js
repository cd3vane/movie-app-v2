import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReviewItem from './ReviewItem';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getReviewsByUser } from '../../actions/review';

const UserReviews = ({
  profile: { profile },
  getReviewsByUser,
  review: { reviews, loading }
}) => {
  useEffect(() => {
    getReviewsByUser(profile.user._id);
  }, [getReviewsByUser, profile.user._id]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Reviews</h1>
      {reviews.length > 0 ? (
        <Fragment>
          <div className='reviews'>
            {reviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h4>This user does not have any reviews yet</h4>
        </Fragment>
      )}
    </Fragment>
  );
};

UserReviews.propTypes = {
  getReviewsByUser: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  review: state.review,
  profile: state.profile
});

export default connect(mapStateToProps, { getReviewsByUser })(UserReviews);

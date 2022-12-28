import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { getListsByUser } from '../../actions/lists';
import { getReviewsByUser } from '../../actions/review';

const DashboardStats = ({
  id,
  getListsByUser,
  getReviewsByUser,
  lists: { lists, listsLoading },
  review: { reviews, reviewLoading }
}) => {
  useEffect(() => {
    getListsByUser(id);
    getReviewsByUser(id);
  }, [getListsByUser, getReviewsByUser, id]);

  return (
    <Fragment>
      <h3 className=' large text-primary'>Account Stats</h3>
      {!listsLoading && (
        <Fragment>
          {lists.length > 0 ? (
            <Fragment>
              <h2>Number of Lists: {lists.length}</h2>
              {lists.map((list) => (
                <h2 key={list._id}>
                  Movies in {list.name}: {list.movies.length}
                </h2>
              ))}
            </Fragment>
          ) : (
            <h2>No lists yet. Have you created a profile?</h2>
          )}
        </Fragment>
      )}
      {!reviewLoading && (
        <Fragment>
          {reviews.length > 0 ? (
            <h2>Reviews: {reviews.length}</h2>
          ) : (
            <h2>No reviews yet. Review some movies now!</h2>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

DashboardStats.propTypes = {
  getListsByUser: PropTypes.func.isRequired,
  getReviewsByUser: PropTypes.func.isRequired,
  lists: PropTypes.object,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  lists: state.lists,
  auth: state.auth,
  review: state.review
});

export default connect(mapStateToProps, { getListsByUser, getReviewsByUser })(
  useNavigate(DashboardStats)
);

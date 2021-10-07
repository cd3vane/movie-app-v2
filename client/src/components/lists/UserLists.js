import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import ListsView from './ListsView';
import { getListsByUser } from '../../actions/lists';

const UserLists = ({
  auth: { isAuthenticated, user, userLoading },
  getListsByUser,
  lists: { lists, listsLoading }
}) => {
  useEffect(() => {
    getListsByUser(user._id);
  }, [getListsByUser, user._id]);

  return (
    <Fragment>
      <h1 className='large text-primary'>User Lists</h1>
      {!isAuthenticated || userLoading || listsLoading ? (
        <Spinner />
      ) : (
        <ListsView lists={lists} />
      )}
    </Fragment>
  );
};

UserLists.propTypes = {
  getListsByUser: PropTypes.func.isRequired,
  lists: PropTypes.object,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  lists: state.lists,
  auth: state.auth
});

export default connect(mapStateToProps, { getListsByUser })(
  withRouter(UserLists)
);

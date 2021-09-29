import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import { getListsByUser } from '../../actions/lists';

const Lists = ({
  auth: { user, userLoading },
  getListsByUser,
  lists: { lists, listsLoading }
}) => {
  useEffect(() => {
    getListsByUser(user._id);
  }, [getListsByUser, user._id]);

  return (
    <Fragment>
      {userLoading || listsLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>My Lists</h1>
          <small>(Click title to view the entire list)</small>
          <br />
          {lists.length > 0 ? (
            lists.map((list) => <ListItem key={list._id} list={list} />)
          ) : (
            <h4>No lists yet. Have you created a profile?</h4>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Lists.propTypes = {
  getListsByUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  lists: PropTypes.object
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  lists: state.lists
});

export default connect(mapStateToProps, { getListsByUser })(Lists);

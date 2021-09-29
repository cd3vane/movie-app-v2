import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import { getCurrentLists } from '../../actions/lists';

const Lists = ({
  auth: { user, userLoading },
  getCurrentLists,
  lists: { lists, listsLoading }
}) => {
  useEffect(() => {
    getCurrentLists(user._id);
  }, [getCurrentLists]);

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
  getCurrentLists: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  lists: PropTypes.object
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  lists: state.lists
});

export default connect(mapStateToProps, { getCurrentLists })(Lists);

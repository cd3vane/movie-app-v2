import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import ListsView from '../lists/ListsView';
import { useNavigate } from 'react-router';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getListsByUser } from '../../actions/lists';

const ProfileLists = ({
  profile: { user, name },
  getListsByUser,
  lists: { lists, listsLoading }
}) => {
  useEffect(() => {
    getListsByUser(user._id);
  }, [getListsByUser, user._id]);

  //const navigate = useNavigate();
  return (
    <Fragment>
      <h1 className='large text-primary'>{name}'s Lists</h1>
      {listsLoading ? <Spinner /> : <ListsView lists={lists} />}
    </Fragment>
    
    
  );
};

ProfileLists.propTypes = {
  getListsByUser: PropTypes.func.isRequired,
  lists: PropTypes.object,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  lists: state.lists
});

export default connect(mapStateToProps, { getListsByUser });

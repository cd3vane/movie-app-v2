import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import ListItem from './ListItem';

const Lists = ({ lists }) => {
  return (
    <Fragment>
      <small>(Click title to view the entire list)</small>
      <br />
      {lists.length > 0 ? (
        lists.map((list) => <ListItem key={list._id} list={list} />)
      ) : (
        <h4>No lists yet. Have you created a profile?</h4>
      )}
    </Fragment>
  );
};

Lists.propTypes = {
  lists: PropTypes.object.isRequired
};

export default useNavigate(Lists);

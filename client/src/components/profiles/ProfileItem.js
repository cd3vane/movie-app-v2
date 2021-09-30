import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    name,
    user: { _id, avatar },
    location
  }
}) => {
  return (
    <div className='profile-list-container'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2 className='text-primary'>{name}</h2>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary btn-rounded'>
          View Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;

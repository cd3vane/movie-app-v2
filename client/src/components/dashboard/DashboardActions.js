import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = ({ user: { _id } }) => {
  return (
    <div className='dash-buttons'>
      <Link to='/update-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <Link to={`/${_id}/lists`} className='btn btn-light'>
        <i className='fas fa-list text-primary'></i> My Lists
      </Link>
      <Link to='/movies/1' className='btn btn-light'>
        <i className='fas fa-search text-primary'></i> Discover Movies
      </Link>
      <Link to={`/${_id}/reviews`} className='btn btn-light'>
        <i className='fas fa-pen text-primary'></i> My Reviews
      </Link>
    </div>
  );
};

export default DashboardActions;

import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = ({ user: { _id } }) => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <Link to={'/account/watchlist/'} className='btn btn-light'>
        <i className='fab fa-black-tie text-primary'></i> View Watchlist
      </Link>
      <Link to='/movies/1' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary'></i> Discover Movies
      </Link>
    </div>
  );
};

export default DashboardActions;

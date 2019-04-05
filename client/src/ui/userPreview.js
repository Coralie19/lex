import React from 'react';

import CircleProfile from './circleProfile';

import '../styles/ui/userPreview.css';

const UserPreview = ({username, isOnline, photoUrl, showPhoto, onClick}) => {
  const statusCss = isOnline ? '--online' : '--offline';
  return (
    <button className='user-preview' onClick={onClick}>
      {
        showPhoto
        && <CircleProfile photoUrl={photoUrl} />
      }
      <div className='user-preview__username'>{username}</div>
      <div className={`user-preview__status${statusCss}`}></div>
    </button>
  )
}

export default UserPreview;
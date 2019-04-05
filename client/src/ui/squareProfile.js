import React from 'react';

import blankProfile from '../assets/blank-profile.png';

import '../styles/ui/squareProfile.css';

const SquareProfile = ({photoUrl, height='15rem', width='15rem'}) => {
  photoUrl = photoUrl || blankProfile;
  return (
    <div 
      className='square-profile'
      style={{
        backgroundImage: `url(${photoUrl})`,
        height,
        width
      }}
    ></div>
  );
}

export default SquareProfile;
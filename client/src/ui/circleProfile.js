import React from 'react';

import blankProfile from '../assets/blank-profile.png';

import '../styles/ui/circleProfile.css';

const CircleProfile = ({onClick, photoUrl, height='5rem', width='5rem'}) => {
  return (
    <div 
      className='circle-profile' 
      onClick={onClick} 
      style={{
        backgroundImage: `url(${photoUrl || blankProfile}`,
        height,
        width
      }}
    ></div>
  );
}

export default CircleProfile;
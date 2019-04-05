import React from 'react';
import '../styles/ui/squareProfile.css';

const SquareProfile = ({photoUrl, height='15rem', width='15rem'}) => {
  photoUrl = photoUrl || '/blank-profile.png';
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
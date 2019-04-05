import React from 'react';
import '../styles/withOverlay.css';

const withOverlay = WrappedComponent => {
  return (
    <div className='overlay-container'>
      <WrappedComponent />
    </div>
  )
}

export default withOverlay;
import React from 'react';
import '../styles/ui/iconButton.css';

const IconButton = ({iconUrl, style, onClick}) => {
  return (
    <button 
      className='icon-button'
      onClick={onClick}
      style={{
        backgroundImage: `url(${iconUrl})`,
        ...style
      }}
    ></button>
  );
}

export default IconButton;
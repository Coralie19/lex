import React from 'react';
import '../styles/ui/textButton.css';

const TextButton = ({name='Submit', onClick, type}) => {
  return (
    <input type='submit' className={`text-button--${type}`} onClick={onClick} value={name}>
    </input>
  )
}

export default TextButton;
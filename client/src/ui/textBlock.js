import React from 'react';
import '../styles/ui/textBlock.css';

const TextBlock = ({title, text}) => {
  return (
    <div className='text-block'>
      <div className='text-block__title'>{title}</div>
      <div className='text-block__text'>{text}</div>
    </div>
  )
}

export default TextBlock;
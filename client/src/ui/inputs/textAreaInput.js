import React from 'react';

import SecondaryHeading from '../../ui/secondaryHeading';

import '../../styles/ui/inputs/textAreaInput.css';

const TextAreaInput = ({title, value, name, type='text', placeholder, onChange, style}) => {
  return (
    <div>
      <SecondaryHeading title={title} />
      <textarea
        className='text-input'
        style={style}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextAreaInput;
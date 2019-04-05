import React from 'react';

import SecondaryHeading from '../../ui/secondaryHeading';

import '../../styles/ui/inputs/textInput.css';

const TextInput = ({title, value, name, type='text', placeholder, onChange, style}) => {
  return (
    <>
      { title && <SecondaryHeading title={title} /> }
      <input className='text-input' style={style} type={type} value={value} name={name} onChange={onChange} placeholder={placeholder}></input>
    </>
  )
}

export default TextInput;
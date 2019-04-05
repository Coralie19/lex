import React from 'react';

import SecondaryHeading from '../../ui/secondaryHeading';

import '../../styles/ui/inputs/fileInput.css';

const FileInput = ({title, value, name, placeholder, onChange, style}) => {
  return (
    <div>
      <SecondaryHeading title={title} />
      <input className='file-input' style={style} type='file' value={value} name={name} onChange={onChange} placeholder={placeholder}></input>
    </div>
  )
}

export default FileInput;
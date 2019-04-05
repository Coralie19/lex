import React from 'react';

const ImageUpload = ({onChange, value, cssName, title}) => {
  return (
    <div className={`edit-profile__container--${cssName}`}>
      <div className={`edit-profile__prompt--${cssName}`}>{title}</div>
      <label className={`edit-profile__input--${cssName}`}>
        <input 
          onChange={onChange}
          type='file' 
          name='profilePhoto'
        ></input>
        Choose file
      </label>
      <span>{value ? value.name : 'No file selected'}</span>
    </div>
  )
}

export default ImageUpload;
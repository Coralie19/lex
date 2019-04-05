import React from 'react';

const TextInput = ({title, onChange, value, name, cssName}) => {
  return (
    <div className={`edit-profile__container--${cssName}`}>
      <div className={`edit-profile__prompt--${cssName}`}>{title}</div>
      <input
        className={`edit-profile__input--${cssName}`}
        onChange={onChange}
        value={value}
        name={name}
        type='text'>
      </input>
    </div>
  )
}

export default TextInput;
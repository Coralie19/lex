import React from 'react';

const LanguageSelectedLearning = ({language, setLanguageLearning}) => {
  return (
    <div className='language__selected-item-learning'>
      <span>Learning?</span>
      <input 
        id={language.id} 
        checked={language.learning || false} 
        onChange={setLanguageLearning} 
        type='checkbox'>
      </input>
    </div>
  )
}

export default LanguageSelectedLearning;
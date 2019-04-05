import React from 'react';

const LanguageSelectedProficiency = ({language, setLanguageProficiency, allProficiencies}) => {
  const value = language.proficiency ? language.proficiency.level : 1;
  return (
    <select 
      className='language__selected-item-proficiency' 
      value={value} 
      onChange={setLanguageProficiency} 
      name={language.id}
    >
      { 
        Object.values(allProficiencies).map(proficiency => (
          <option className='language__selected-item-proficiency-option' key={proficiency.id} value={proficiency.level}>{proficiency.name}</option>
        )) 
      }
    </select>
  )
}

export default LanguageSelectedProficiency;
import React from 'react';
import LanguageSelectedProficiency from './languageSelectedProficiency';
import LanguageSelectedLearning from './languageSelectedLearning';
import './languageSelected.css';

const LanguageSelected = ({allProficiencies, selectedLanguages, setLanguageLearning, setLanguageProficiency, toggleLanguage}) => {
  return (
    <div>
      { selectedLanguages.length === 0 && <div className='language__selected-blank'>No languages selected...</div>}
      { selectedLanguages.map(language => (
          <div className='language__selected-item' key={language.id}>
            <span className='language__selected-item-name'>{language.name}</span>
            <div className='language__selected-item-inputs'>
            <LanguageSelectedProficiency language={language} allProficiencies={allProficiencies} setLanguageProficiency={setLanguageProficiency} />
            <LanguageSelectedLearning language={language} setLanguageLearning={setLanguageLearning} />
            </div>
            <button className='language__selected-item-remove' data-id={language.id} onClick={toggleLanguage}>Remove</button>
          </div>
        )) 
      }
    </div>
  )
}

export default LanguageSelected;
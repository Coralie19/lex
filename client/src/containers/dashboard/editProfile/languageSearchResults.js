import React from 'react';

const LanguageSearchResults = ({languageSearchText, toggleLanguage, allLanguages}) => {
  return (
    <div className='edit-profile__language-search-results'>
      {
        languageSearchText !== '' 
        && Object.values(allLanguages)
        .filter(language => language.name.toLowerCase().indexOf(languageSearchText.toLowerCase()) !== -1)
        .map(language => {
          return (
            <div className='edit-profile__language-search-results-item' onClick={toggleLanguage} data-id={language.id} key={language.id}>{language.name}</div>
            )
          })
        }
    </div>
  )
}

export default LanguageSearchResults;
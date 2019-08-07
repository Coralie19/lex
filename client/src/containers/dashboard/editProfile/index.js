import React, { useState}  from 'react';
import axios from 'axios';
import { pick } from 'lodash';

import ImageUpload from './imageUpload';
import TextInput from './textInput';
import LanguageSearchResults from './languageSearchResults';
import LanguageSelected from './languageSelected';
import '../../../styles/containers/editProfile.css';


const EditProfile = (props) => {

  const [inputs, setInputs] = useState({username: props.username, aboutMe: '', languages:[], languageSearchText: ''});
  const [profilePhoto, setPhoto] = useState(null);
  const [saveState, setSaveState ]= useState('Save');

  const handleSubmit = (e) => {
    e.preventDefault()
    const promises = [];
    setSaveState('Saving...'); //not working
    promises.push(axios({
      method: 'put',
      url: '/user',
      headers: { authorization: `Bearer ${window.localStorage.getItem('token')}` },
      data: pick(inputs, 'aboutMe', 'languages', 'username') //to check
    })
    .then(res => {
      console.log(res.data);
      props.replaceUser(res.data)
    }));

    if (profilePhoto) {
      const image = new FormData();
      image.append('profilePhoto', profilePhoto);
      promises.push(axios.post('/user/photo', image, {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem('token')}`,
          'Content-Type': "multipart/form-data",
        }
      })
      .then(res => props.setUser({ photoUrl: res.data.photoUrl })));
    }
    Promise.all(promises)
    .then(() => { //not working
      setSaveState('Saved');
    })
  }

  const onTextChange = (e) => {
    e.persist();
    setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
  }

  const onImageChange = (e) => {
    setPhoto({
      profilePhoto: e.target.files[0]
    })
  }

  const toggleLanguage = (e) => {
    const languageId = e.target.getAttribute('data-id');
    const index = inputs.languages.findIndex(language => language.id === Number(languageId));
    if (index === -1) {
      const language = props.allLanguages[languageId];
      language.learning = false;
      language.proficiency = props.allProficiencies[1];
      setInputs(inputs => ({ 
        languages: inputs.languages.concat(language),
        languageSearchText: '' 
      }));
    } else {
      const newLanguages = inputs.languages.slice();
      newLanguages.splice(index, 1);
      setInputs({  
        languages: newLanguages, 
        languageSearchText: '' 
      });
    }
  }

  const setLanguageProficiency = (e) => {
    const languageId = e.target.name
    const index = e.target.selectedIndex;
    const option = e.target.childNodes[index].value;
    setInputs(inputs => {
      const languageIndex = inputs.languages.findIndex(language => language.id === Number(languageId));
      const newLanguages = inputs.languages.slice();
      const newProficiency = props.allProficiencies[option];
      newLanguages[languageIndex] = Object.assign({}, inputs.languages[languageIndex], { proficiency: newProficiency });
      return { languages: newLanguages }
    })
  }

  const setLanguageLearning = (e) => {
    const target = e.target;
    setInputs(inputs => {
      const languageIndex = inputs.languages.findIndex(language => language.id === Number(target.id));
      const newLanguages = inputs.languages.slice();
      newLanguages[languageIndex] = Object.assign({}, inputs.languages[languageIndex], { learning: !inputs.languages[languageIndex].learning });
      return { languages: newLanguages }
    })
  }

    return (
      <form onSubmit={handleSubmit} className='edit-profile'>
        <div className='edit-profile__title'>Edit Profile</div>
        <div className='edit-profile__main'>
          <div className='edit-profile__left'>
            <ImageUpload title='Upload a photo' cssName='photo' onChange={onImageChange} value={inputs.profilePhoto} />
            <TextInput title='Username' onChange={onTextChange} value={inputs.username} cssName='username' name='username' />
            <div className='edit-profile__container--about-me'>
              <div className={`edit-profile__prompt--about-me`}>About Me</div>
              <textarea
                className={`edit-profile__input--about-me`}
                onChange={onTextChange}
                value={inputs.aboutMe || ''}
                name='aboutMe'
                type='text'>
              </textarea>
            </div>
          </div>
          <div className='edit-profile__right'>
            <div className='edit-profile__language-autocomplete'>
              <TextInput title='Add a language' onChange={onTextChange} value={inputs.languageSearchText} cssName='language-search' name='languageSearchText' />
              <LanguageSearchResults languageSearchText={inputs.languageSearchText} allLanguages={props.allLanguages} toggleLanguage={toggleLanguage} />
            </div>
            <div className='edit-profile__container--language-selected'>
              <div className='edit-profile__prompt'>Current languages</div>
              <LanguageSelected toggleLanguage={toggleLanguage} selectedLanguages={inputs.languages} setLanguageProficiency={setLanguageProficiency} setLanguageLearning={setLanguageLearning} allProficiencies={props.allProficiencies} />
            </div>
          </div>
        </div>
        <div className='edit-profile__buttons'>
          <input className='edit-profile__submit' type='submit' value={`${saveState}`}></input>
          <input onClick={props.close} className='edit-profile__submit' type='submit' value='Close'></input>
        </div>
      </form>
    )
  }

export default EditProfile;
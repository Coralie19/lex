import React, { Component } from 'react';
import axios from 'axios';
import { pick } from 'lodash';

import ImageUpload from './imageUpload';
import TextInput from './textInput';
import LanguageSearchResults from './languageSearchResults';
import LanguageSelected from './languageSelected';
import './editProfile.css';

class EditProfile extends Component {
  state = {
    ...this.props.user,
    languageSearchText: '',
    profilePhoto: null,
    saveState: 'Save',
  };

  onSubmit = (e) => {
    e.preventDefault()
    const promises = []
    this.setState({ saveState: 'Saving...' });
    promises.push(axios({
      method: 'put',
      url: '/user',
      headers: { authorization: `Bearer ${window.localStorage.getItem('token')}` },
      data: pick(this.state, 'aboutMe', 'languages', 'username')
    })
    .then(res => {
      console.log(res.data);
      this.props.replaceUser(res.data)
    }));

    if (this.state.profilePhoto) {
      const image = new FormData();
      image.append('profilePhoto', this.state.profilePhoto);
      promises.push(axios.post('/user/photo', image, {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem('token')}`,
          'Content-Type': "multipart/form-data",
        }
      })
      .then(res => this.props.setUser({ photoUrl: res.data.photoUrl })));
    }
    Promise.all(promises)
    .then(() => {
      this.setState({ saveState: 'Saved' });
    })
  }

  onTextChange = (e) => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onImageChange = (e) => {
    this.setState({
      profilePhoto: e.target.files[0]
    })
  }

  toggleLanguage = (e) => {
    const languageId = e.target.getAttribute('data-id');
    const index = this.state.languages.findIndex(language => language.id === Number(languageId));
    if (index === -1) {
      const language = this.props.allLanguages[languageId];
      language.learning = false;
      language.proficiency = this.props.allProficiencies[1];
      this.setState(state => ({ 
        languages: state.languages.concat(language),
        languageSearchText: '' 
      }));
    } else {
      const newLanguages = this.state.languages.slice();
      newLanguages.splice(index, 1);
      this.setState({  
        languages: newLanguages, 
        languageSearchText: '' 
      });
    }
  }

  setLanguageProficiency = (e) => {
    const languageId = e.target.name
    const index = e.target.selectedIndex;
    const option = e.target.childNodes[index].value;
    this.setState(state => {
      const languageIndex = state.languages.findIndex(language => language.id === Number(languageId));
      const newLanguages = state.languages.slice();
      const newProficiency = this.props.allProficiencies[option];
      newLanguages[languageIndex] = Object.assign({}, state.languages[languageIndex], { proficiency: newProficiency });
      return { languages: newLanguages }
    })
  }

  setLanguageLearning = (e) => {
    const target = e.target;
    this.setState(state => {
      const languageIndex = state.languages.findIndex(language => language.id === Number(target.id));
      const newLanguages = state.languages.slice();
      newLanguages[languageIndex] = Object.assign({}, state.languages[languageIndex], { learning: !state.languages[languageIndex].learning });
      return { languages: newLanguages }
    })
  }

  render () {
    return (
      <form onSubmit={this.onSubmit} className='edit-profile'>
        <div className='edit-profile__title'>Edit Profile</div>
        <div className='edit-profile__main'>
          <div className='edit-profile__left'>
            <ImageUpload title='Upload a photo' cssName='photo' onChange={this.onImageChange} value={this.state.profilePhoto} />
            <TextInput title='Username' onChange={this.onTextChange} value={this.state.username} cssName='username' name='username' />
            <div className='edit-profile__container--about-me'>
              <div className={`edit-profile__prompt--about-me`}>About Me</div>
              <textarea
                className={`edit-profile__input--about-me`}
                onChange={this.onTextChange}
                value={this.state.aboutMe || ''}
                name='aboutMe'
                type='text'>
              </textarea>
            </div>
          </div>
          <div className='edit-profile__right'>
            <div className='edit-profile__language-autocomplete'>
              <TextInput title='Add a language' onChange={this.onTextChange} value={this.state.languageSearchText} cssName='language-search' name='languageSearchText' />
              <LanguageSearchResults languageSearchText={this.state.languageSearchText} allLanguages={this.props.allLanguages} toggleLanguage={this.toggleLanguage} />
            </div>
            <div className='edit-profile__container--language-selected'>
              <div className='edit-profile__prompt'>Current languages</div>
              <LanguageSelected toggleLanguage={this.toggleLanguage} selectedLanguages={this.state.languages} setLanguageProficiency={this.setLanguageProficiency} setLanguageLearning={this.setLanguageLearning} allProficiencies={this.props.allProficiencies} />
            </div>
          </div>
        </div>
        <input className='edit-profile__submit' type='submit' value={`${this.state.saveState}`}></input>
        <input onClick={this.props.close} className='edit-profile__submit' type='submit' value='Close'></input>
      </form>
    )
  }
}

export default EditProfile;
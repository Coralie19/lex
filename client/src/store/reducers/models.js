import { combineReducers } from 'redux';
import { keyBy } from 'lodash';

const initialState = {
  matches: {},
  messages: {},
  languages: {},
  proficiencies: {},
}

const matches = (state=initialState.matches, action) => {
  switch (action.type) {
    case 'SET_MATCHES': {
      return action.matches;
    }
    default: {
      return state;
    }
  }
}

const messages = (state=initialState.messages, action) => {
  switch (action.type) {
    case 'SET_ROOM_MESSAGES': {
      return {
        ...state,
        [action.roomId]: action.messages
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      };
    }
    case 'ADD_MESSAGE': {
      return {
        ...state,
        [action.roomId]: state[action.roomId]
        .concat(action.message)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      }
    }
    default: {
      return state;
    }
  }
}

const languages = (state=initialState.languages, action) => {
  switch (action.type) {
    case 'SET_LANGUAGES': {
      return keyBy(action.languages, 'id');
    }
    default: {
      return state;
    }
  }
}

const proficiencies = (state=initialState.proficiencies, action) => {
  switch (action.type) {
    case 'SET_PROFICIENCIES': {
      return keyBy(action.proficiencies, 'level');
    }
    default: {
      return state;
    }
  }
}

const models = combineReducers({
  matches, messages, languages, proficiencies
})

export default models;
import { combineReducers } from 'redux';

const initialState = {
  user: null,
  token: null,
}

const token = (state=initialState.token, action) => {
  switch(action.type) {
    case 'SET_TOKEN': {
      return action.token;
    }
    case 'LOGIN': {
      return action.token;
    }
    case 'LOGOUT': {
      return null;
    }
    default: {
      return state;
    }
  }
}

const user = (state=initialState.user, action) => {
  switch(action.type) {
    case 'SET_USER': {
      return {
        ...state,
        ...action.user
      }
    }
    case 'REPLACE_USER': {
      return action.user
    }
    case 'LOGIN': {
      return action.user;
    }
    case 'LOGOUT': {
      return null;
    }
    default: {
      return state;
    }
  }
}

const session = combineReducers({ 
  token, user
});

export default session;
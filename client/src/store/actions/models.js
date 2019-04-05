const setMatches = (matches) => ({
  type: 'SET_MATCHES',
  matches,
})

const setRoomMessages = (roomId, messages) => ({
  type: 'SET_ROOM_MESSAGES',
  messages, roomId
})

const addMessage = (message, roomId) => ({
  type: 'ADD_MESSAGE',
  message, roomId
})

const setLanguages = (languages) => ({
  type: 'SET_LANGUAGES',
  languages
})

const setProficiencies = (proficiencies) => ({
  type: 'SET_PROFICIENCIES',
  proficiencies
})

const models = {
  setMatches, setRoomMessages, addMessage, setLanguages, setProficiencies
}

export default models;
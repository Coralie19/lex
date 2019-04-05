const setToken = (token) => ({
  type: 'SET_TOKEN',
  token,
})

const setUser = (user) => ({
  type: 'SET_USER',
  user
})

const replaceUser = (user) => ({
  type: 'REPLACE_USER',
  user
})

const logout = () => {
  window.localStorage.clear();
  return {
    type: 'LOGOUT'
  }
}

const login = (user, token) => ({
  type: 'LOGIN',
  user, token
})

const session = {
  setToken, setUser, replaceUser, logout, login
}

export default session;
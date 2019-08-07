import React, {useEffect, useState}  from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import session from '../../store/actions/session';

import Logo from '../../ui/logo';
import Heading from '../../ui/heading';
import TextInput from '../../ui/inputs/textInput';
import TextButton from '../../ui/textButton';
import TextLink from '../../ui/textLink';

import '../../styles/containers/auth/login.css';
import withApi from '../../hocs/withApi';


const Signup = (props) => {

  const [inputs, setInputs] = useState({username: '', password: ''});

  useEffect ( () => {
    const storedToken = window.localStorage.getItem('token');
    if (storedToken) props.setToken(storedToken);
    console.log('stored token is', storedToken)
  
    if (props.token) {
      props.get('/user/me')
      .then((res) => {
        console.log('res is :', res)
        props.setUser(res.data.user);
        props.history.push('/dashboard');
      })
      .catch((err) => {
        props.setToken(null);
        window.localStorage.removeItem('token');
      })
    }
  });

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      const encoded = btoa(Object.values(inputs).join(':'))
      console.log('encoded is', encoded);
      console.log('reversed encoded is', atob(encoded));
  
      props.get('/auth', {
        headers: {
          Authorization: `Basic ${encoded}`
        }
      })
      .then((res) => {
        console.log(res);
        const { user, token } = res.data;
        window.localStorage.setItem('token', token);
        props.login(user, token);
        props.history.push('/dashboard'); 
        signupAlert(); 
      });
    }
  }

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  const signupAlert = () => {
    alert(`Login successful! 
          username: ${inputs.username}
          password: ${inputs.password}`);
  }

  return (
    <div className='login-container'>
      <Logo />
      <form className='login' onSubmit={handleSubmit}>
        <Heading title='Login' />
        <TextInput type='text' name='username' placeholder='Username' onChange={handleInputChange} value={inputs.username} />
        <TextInput type='password' name='password' placeholder='Password' onChange={handleInputChange} value={inputs.password} />
        <TextButton />
        <TextLink title='Register' to='/register' />
      </form>
    </div>
  )
}

//connection to store
const mapStateToProps = (state) => ({
  token: state.session.token
})

const mapDispatchToProps = (dispatch) => ({
  setToken: token => dispatch(session.setToken(token)),
  setUser: user => dispatch(session.setUser(user)),
  login: (user, token) => dispatch(session.login(user, token)),
})

export default withApi(withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(Signup)));
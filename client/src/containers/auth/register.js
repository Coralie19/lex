import React, {useState}  from 'react';
import { withRouter } from 'react-router-dom';

import Logo from '../../ui/logo';
import Heading from '../../ui/heading';
import TextInput from '../../ui/inputs/textInput';
import TextButton from '../../ui/textButton';
import TextLink from '../../ui/textLink';

import '../../styles/containers/auth/register.css';
import withApi from '../../hocs/withApi';


const Register = (props) => {

  const [inputs, setInputs] = useState({username: '', password: '', passwordRepeat: ''});

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.post('/auth', {
      username: inputs.username,
      password: inputs.password,
    })
    .then((res) => {
      const { token } = res.data;
      window.localStorage.setItem('token', token);
      props.history.push('/login');
    });
  }

    return (
      <div className='register-container'>
        <Logo />
        <form onSubmit={handleSubmit} className='register'>
          <Heading title='Register' />
          <TextInput value={inputs.username} onChange={handleInputChange} name='username' placeholder='Username' />
          <TextInput type="password" value={inputs.password} onChange={handleInputChange} name='password' placeholder='Password' />
          <TextInput type="password" value={inputs.passwordRepeat} onChange={handleInputChange} name='passwordRepeat' placeholder='Repeat Password' />
          <TextButton />
          <TextLink title='Login' to='/login' />
        </form>
      </div>
    )
  }

export default withApi(withRouter(Register));
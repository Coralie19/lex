import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Logo from '../../ui/logo';
import Heading from '../../ui/heading';
import TextInput from '../../ui/inputs/textInput';
import TextButton from '../../ui/textButton';
import TextLink from '../../ui/textLink';

import '../../styles/containers/auth/register.css';
import withApi from '../../hocs/withApi';

class Register extends Component {
  state = {
    username: '',
    password: '',
    passwordRepeat: '',
  }

  onTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.post('/register', {
      username: this.state.username,
      password: this.state.password,
    })
    .then((res) => {
      const { token } = res.data;
      window.localStorage.setItem('token', token);
      this.props.history.push('/login');
    });
  }

  render() {
    return (
      <div className='register-container'>
        <Logo />
        <form onSubmit={this.onSubmit} className='register'>
          <Heading title='Register' />
          <TextInput value={this.state.username} onChange={this.onTextChange} name='username' placeholder='Username' />
          <TextInput type="password" value={this.state.password} onChange={this.onTextChange} name='password' placeholder='Password' />
          <TextInput type="password" value={this.state.passwordRepeat} onChange={this.onTextChange} name='passwordRepeat' placeholder='Repeat Password' />
          <TextButton />
          <TextLink title='Login' to='/login' />
        </form>
      </div>
    )
  }
}

export default withApi(withRouter(Register));
// Previous Login component, now refactored with Hooks in Signup.js



// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

// import session from '../../store/actions/session';

// import Logo from '../../ui/logo';
// import Heading from '../../ui/heading';
// import TextInput from '../../ui/inputs/textInput';
// import TextButton from '../../ui/textButton';
// import TextLink from '../../ui/textLink';

// import '../../styles/containers/auth/login.css';
// import withApi from '../../hocs/withApi';


// class Login extends Component {
//   state = {
//     username: '',
//     password: ''
//   }

//   componentDidMount() {
//     const storedToken = window.localStorage.getItem('token');
//     if (storedToken) this.props.setToken(storedToken);
//     console.log('stored token is', storedToken)
//   }

//   componentDidUpdate() {
//     console.log('set user token')
//     if (this.props.token) {
//       this.props.get('/user/me')
//       .then((res) => {
//         console.log('res is :', res)
//         this.props.setUser(res.data.user);
//         this.props.history.push('/dashboard');
//       })
//       .catch((err) => {
//         console.log('error is:', err);
//         this.props.setToken(null);
//         window.localStorage.removeItem('token');
//       })
//     }
//   }

//   // onTextChange = (e) => this.setState({ [e.target.name]: e.target.value });

//   onSubmit = (e) => {
//     console.log('on submit done, e is',e);
//     e.preventDefault();
//     const encoded = btoa(Object.values(this.state).join(':'))
//     console.log('encoded is', encoded);
//     console.log('reversed encoded is', atob(encoded));

// //instead of /auth
//     this.props.get('http://localhost:4000/auth', {
//       headers: {
//         Authorization: `Basic ${encoded}`
//       }
//     })
//     .then((res) => {
//       console.log(res);
//       const { user, token } = res.data;
//       window.localStorage.setItem('token', token);
//       this.props.login(user, token);
//       this.props.history.push('/dashboard');  
//     });
//   }

//   render() {
  
//     return (
//       <div className='login-container'>
//         <Logo />
//         <form onSubmit={this.onSubmit} className='login'>
//           <Heading title='Login' />
//           <TextInput onChange={this.onTextChange} value={this.state.username} name='username' placeholder='Username' />
//           <TextInput type='password' onChange={this.onTextChange} value={this.state.password} name='password' placeholder='Password' />
//           <TextButton />
//           <TextLink title='Register' to='/register' />
//         </form>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => ({
//   token: state.session.token
// })

// const mapDispatchToProps = (dispatch) => ({
//   setToken: token => dispatch(session.setToken(token)),
//   setUser: user => dispatch(session.setUser(user)),
//   login: (user, token) => dispatch(session.login(user, token)),
// })

// export default withApi(withRouter(connect(
//   mapStateToProps, mapDispatchToProps
// )(Login)));
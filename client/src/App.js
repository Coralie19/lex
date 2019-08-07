import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import PrivateRoute from './hocs/privateRoute';
import { connect } from 'react-redux';

import Signup from './containers/auth/signup'
// import Login from './containers/auth/login';
import Register from './containers/auth/register';
import Dashboard from './containers/dashboard';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/login' component={Signup} />
          <Route path='/register' component={Register} />
          <PrivateRoute path='/dashboard' user={this.props.user} component={Dashboard} />
          <Route path='/' exact render={() => (
            this.props.user
            ? <Redirect to='/dashboard' />
            : <Redirect to='/login' />
          )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.session.user,
});

export default withRouter(connect(
  mapStateToProps
)(App));

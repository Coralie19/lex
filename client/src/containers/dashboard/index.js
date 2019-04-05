import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import withApi from '../../hocs/withApi';
import session from '../../store/actions/session';
import models from '../../store/actions/models';

import Header from './header';
import Matches from './matches';
import EditProfile from './editProfile';
import Chat from './chat';

import '../../styles/containers/dashboard.css';

class Dashboard extends Component {
  attachSocketListeners() {
    this.socket.on('connect', () => console.log('User online.'));
    this.socket.on('disconnect', () => console.log('User offline.'));
    this.socket.on('message', () => console.log('received message'));
  }

  componentDidMount() {
    this.props.get('/languages')
    .then(res => {
      this.props.setLanguages(res.data);
    })

    this.props.get('/proficiencies')
    .then(res => {
      this.props.setProficiencies(res.data);
    })

    this.socket = io('/', {
      query: { id: this.props.user.id },
      secure: true,
    });
    this.attachSocketListeners();
  }

  componentWillUnmount() {
    this.socket.removeAllListeners();
    this.socket.close();
  }

  handleCardClick = (id) => {
    this.props.history.push(`/dashboard/chat/${id}`)
  }

  render() {
    return (
      <div className='dashboard'>
        <Header user={this.props.user} logout={this.props.logout} />
        <div className='dashboard__body'>
          <Switch>
            <Route path='/dashboard/matches' render={() => (
              <Matches setMatches={this.props.setMatches} matches={this.props.matches} onMatchClick={this.handleCardClick} />
            )} />
            <Route path='/dashboard/edit' render={() => (
              <EditProfile
                setUser={this.props.setUser}
                replaceUser={this.props.replaceUser}
                user={this.props.user}
                allLanguages={this.props.languages}
                allProficiencies={this.props.proficiencies}
                close={() => this.props.history.push('/dashboard/matches')}
              />
            )} />
            <Route path='/dashboard/chat/:id' render={() => (
              <Chat matches={this.props.matches} user={this.props.user} socket={this.socket} />
            )} />
            <Route path='/dashboard' render={() => (
                this.props.user.languages.length === 0
                ? <Redirect to='/dashboard/edit' />
                : <Redirect to='/dashboard/matches' />
              )} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.session.user,
  matches: state.models.matches,
  languages: state.models.languages,
  proficiencies: state.models.proficiencies
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(session.logout()),
  setUser: (user) => dispatch(session.setUser(user)),
  replaceUser: (user) => dispatch(session.replaceUser(user)),
  setMatches: (matches) => dispatch(models.setMatches(matches)),
  setLanguages: (languages) => dispatch(models.setLanguages(languages)),
  setProficiencies: (proficiencies) => dispatch(models.setProficiencies(proficiencies))
});

export default withApi(withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(Dashboard)));
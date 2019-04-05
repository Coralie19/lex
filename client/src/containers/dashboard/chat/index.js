import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import models from '../../../store/actions/models';

import Loading from '../../../ui/loading';
import UserPreview from '../../../ui/userPreview';
import IconButton from '../../../ui/iconButton';
import Text from './text';
import Video from './video';

import videoCall from '../../../assets/video-call.png';
import text from '../../../assets/text.png';
import close from '../../../assets/close.png';

import '../../../styles/containers/chat/chat.css';

class Chat extends Component {
  state = {
    loading: true,
    roomId: null,
  }
  buddy = this.props.matches[this.props.match.params.id];
  pathname = this.props.location.pathname;

  componentDidMount() {
    this.props.socket.emit('request-room', [Number(this.props.user.id), Number(this.props.match.params.id)], (roomId, messages) => {
      console.log(`Joined room ${roomId}`)
      this.props.setRoomMessages(roomId, messages);
      this.setState({ loading: false, roomId })
    })
  }

  render() {
    const currentLocation = this.props.location.pathname.split('/').slice(-1)[0];
    return (
      this.state.loading
      ? <Loading />
      : <div className='chat'>
          <div className='chat__header'>
            <UserPreview username={this.buddy.username} photoUrl={this.buddy.photoUrl} showPhoto={true} />
            <div className='chat__navigation'>
              {
                currentLocation === 'text'
                ? <IconButton iconUrl={videoCall} style={{height:'3rem', width:'3rem'}} onClick={() => this.props.history.push(`${this.pathname}/video`)} />
                : <IconButton iconUrl={text} style={{height:'3rem', width:'3rem'}} onClick={() => this.props.history.push(`${this.pathname}/text`)} />
              }
              <IconButton iconUrl={close} style={{height:'1rem', width:'1rem'}} onClick={() => this.props.history.push('/dashboard')} />
            </div>
          </div>
          <Switch>
            <Route path='/dashboard/chat/:id/text' render={() => (
              <Text
                user={this.props.user}
                messages={this.props.messages[this.state.roomId]}
                buddy={this.buddy}
                socket={this.props.socket}
                roomId={this.state.roomId}
              />
            )} />
            <Route path='/dashboard/chat/:id/video' render={() => <Video socket={this.props.socket} />} />
            <Route path='/' render={() => <Redirect to={`${this.pathname}/text`} />} />
          </Switch>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  messages: state.models.messages
})

const mapDispatchToProps = (dispatch) => ({
  setRoomMessages: (roomId, messages) => dispatch(models.setRoomMessages(roomId, messages))
})

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(Chat));
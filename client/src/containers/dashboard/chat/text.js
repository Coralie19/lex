import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageBubble from '../../../ui/messageBubble';
import IconButton from '../../../ui/iconButton';
import TextInput from '../../../ui/inputs/textInput';
import MessageLoader from '../../../ui/messageLoader';

import models from '../../../store/actions/models';

import send from '../../../assets/send.png';

import '../../../styles/containers/chat/text.css';

class Text extends Component {
  state = {
    textInput: '',
    loadingMsg: false
  }

  onTextChange = (e) => {
    this.setState({
      textInput: e.target.value
    })
  }

  createMessage(content) {
    const message = {
      content,
      authorId: this.props.user.id,
      timestamp: new Date(),
      id: this.props.user.id + this.props.roomId + Date.now() + String(++this.id)
    }
    return message;
  }

  componentDidMount = () => {
    this.props.socket.on('new-message', (message) => {
      this.props.addMessage(message, this.props.roomId);
    })
    this.scrollToBottom();
  }

  componentDidUpdate = () => {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.scrollElement.scrollIntoView({ behavior: 'smooth' });
  }
  

  onMessageSubmit = (e) => {
    e.preventDefault();
    this.setState({ loadingMsg: true })
    this.props.socket.emit('message', this.createMessage(this.state.textInput), this.props.roomId, message => {
      this.setState({ loadingMsg: false })
      this.props.addMessage(message, this.props.roomId);
    });
    this.setState({ textInput: '' });
  }

  render() {
    return (
      <div className='chat__text'>
        <div className='text__history'>
          {
            this.props.messages.map(message => {
              return <MessageBubble key={message.id} author={this.props.buddy.username} timestamp={message.timestamp} content={message.content} isSelf={message.authorId === this.props.user.id} />
            })
          }
          {
            this.state.loadingMsg &&
            <MessageLoader />
          }
          <div ref={scrollElement => this.scrollElement = scrollElement} className='text__scroller' />
        </div>
        <form className='text__input' onSubmit={this.onMessageSubmit}>
          <TextInput value={this.state.textInput} onChange={this.onTextChange} style={{width: '100%'}} />
          <IconButton iconUrl={send} style={{height: '3rem', width: '3rem'}} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.session.user,
  matches: state.models.matches
});

const mapDispatchToProps = (dispatch) => ({
  addMessage: (message, roomId) => dispatch(models.addMessage(message, roomId))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Text);
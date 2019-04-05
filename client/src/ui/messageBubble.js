import React from 'react';
import '../styles/ui/messageBubble.css';

const MessageBubble = ({author, timestamp, content, isSelf}) => {
  return (
    <div className={`message-bubble--${isSelf ? 'self' : 'other'}`}>
      <div className='message-bubble__content'>{content}</div>
      <div className='message-bubble__author'>{author}</div>
      <div className='message-bubble__time'>{new Date(timestamp).toLocaleTimeString()}</div>
    </div>
  )
}

export default MessageBubble;
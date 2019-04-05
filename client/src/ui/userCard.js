import React from 'react';

import UserPreview from './userPreview';
import SquareProfile from './squareProfile';
import BulletBlock from './bulletBlock';

import '../styles/ui/userCard.css';

const UserCard = ({user, isOnline, onClick, style}) => {
  const fluentLanguages = user.languages.filter(language => language.proficiency.level === 3);
  const learningLanguages = user.languages.filter(language => language.learning);
  return (
    <div onClick={onClick} className='user-card' style={style}>
      <div className='user-card__title'>
        <UserPreview username={user.username} showPhoto={false} isOnline={isOnline} />
      </div>

      <div className='user-card__profile'>
        <SquareProfile photoUrl={user.photoUrl} />
      </div>
      <BulletBlock title="I'm fluent in..." list={fluentLanguages} itemKey='id' itemValue='name' />
      <BulletBlock title="I'd like to practice..." list={learningLanguages}  itemKey='id' itemValue='name' />
    </div>
  )
}

export default UserCard;
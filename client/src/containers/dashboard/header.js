import React from 'react';
import { withRouter } from 'react-router';

import Logo from '../../ui/logo';
import UserPreview from '../../ui/userPreview';
import IconButton from '../../ui/iconButton';
import logoutIcon from '../../assets/logout.png';

import '../../styles/containers/header.css';

const Header = ({user, logout, history}) => {
  return (
    <div className='header'>
      <Logo />
      <UserPreview onClick={() => history.push('/dashboard/edit')} photoUrl={user.photoUrl} username={user.username} showPhoto={true} />
      <IconButton iconUrl={logoutIcon} style={{height: '3rem', width: '3rem'}} onClick={logout} />
    </div>
  )
}

export default withRouter(Header);
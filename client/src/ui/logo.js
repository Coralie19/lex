import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/ui/logo.css';

const Logo = () => (
  <div className='logo'><Link className='logo__link' to='/'>LEX</Link></div>
)

export default Logo;
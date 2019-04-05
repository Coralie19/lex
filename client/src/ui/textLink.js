import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/ui/textLink.css';

const TextLink = ({title, to}) => {
  return <Link className='text-link' to={to}>{title}</Link>
}

export default TextLink;
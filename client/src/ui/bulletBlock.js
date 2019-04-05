import React from 'react';
import '../styles/ui/bulletBlock.css';

const BulletBlock = ({title, list, itemKey, itemValue}) => {
  return (
    <div className='bullet-block'>
      <div className='bullet-block__title'>{title}</div>
      <ul className='bullet-block__list'>
        {
          list.map(item => {
            return <li className='bullet-block__list-item' key={item[itemKey]}>{item[itemValue]}</li>
          })
        }
      </ul>
    </div>
  )
}

export default BulletBlock;
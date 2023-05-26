import {memo} from 'react';
import {Link} from "react-router-dom";
import './style.css';

function Navigation() {
  return (
    <div className='Navigation'>
      <Link to='/'>Главная</Link>
    </div>
  )
}

export default memo(Navigation);
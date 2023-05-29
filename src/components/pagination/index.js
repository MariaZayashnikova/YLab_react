import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import {createActiveRoutes} from '../../utils';
import './style.css';

function Pagination({amount, currentPage}) {
  const cn = bem('Pagination');

  const setActivePage = ({isActive}) => ({backgroundColor: isActive ? '#0087E9' : 'inherit', color: isActive ? 'white' : 'inherit'});

  function Filling() {
    let result = createActiveRoutes(currentPage, amount)

    return (
      result.map((item, i) => {
        if(Number.isFinite(item)) {
          return (
            <NavLink
              key={i}
              className={cn('cell')}
              style={setActivePage}
              to={`page${item}`}>{item}</NavLink>
          )
        } else {
          return (
            <span key={i} className={cn('delimiter')}>
              {item}
            </span>
          )
        }
      })
    )
  }

  return (
    <div className={cn()}>
      <NavLink
        className={cn('cell')}
        style={setActivePage}
        to='page1'> 1</NavLink>
      <Filling/>
      <NavLink
        className={cn('cell')}
        style={setActivePage}
        to={`page${amount}`}>{amount}</NavLink>
    </div>
  )
}

Pagination.propTypes = {
  amount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
}

export default memo(Pagination);
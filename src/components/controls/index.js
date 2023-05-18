import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onShowCart}){
  return (
    <div className='Controls'>
      <button onClick={() => onShowCart()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onShowCart: PropTypes.func
};

Controls.defaultProps = {
  onShowCart: () => {}
}

export default React.memo(Controls);

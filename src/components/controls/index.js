import React from "react";
import PropTypes from 'prop-types';
import {plural} from '../../utils';
import './style.css';

function Controls({cart, onShowCart}){
  let valueCart;
  if(cart.length === 0) {
    valueCart = 'пусто';
  } else {
    let sum = 0;
    cart.forEach(item => {
      sum += item.count * item.price;
    });
    valueCart = `${cart.length} ${plural(cart.length, {one: 'товар', few: 'товара', many: 'товаров'})} / ${sum} ₽`;
  }

  return (
    <div className='Controls'>
      <div className='Controls-Cart'>
        <span>В корзине:</span>
        <span className='Controls-Cart_font-weight-bold'>
          {valueCart}
        </span>
        <button onClick={() => onShowCart()}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    price: PropTypes.number
  })),
  onShowCart: PropTypes.func
};

Controls.defaultProps = {
  onShowCart: () => {}
}

export default React.memo(Controls);

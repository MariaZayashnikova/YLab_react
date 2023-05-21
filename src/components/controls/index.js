import React from "react";
import PropTypes from 'prop-types';
import {plural} from '../../utils';
import './style.css';

function Controls({totalCart, callback}){
  return (
    <>
      <div className='Controls'>
        <div className='Controls-Cart'>
          <span>В корзине:</span>
          <span className='Controls-Cart_font-weight-bold'>
            {totalCart.count === 0 ? 'пусто' : (
              `${totalCart.count} ${plural(totalCart.count, {one: 'товар', few: 'товара', many: 'товаров'})} / ${totalCart.sum.toLocaleString()} ₽`
            )}
          </span>
          <div className="Controls-Cart_button">
            <button onClick={() =>callback()}>Перейти</button>
          </div>
        </div>
      </div>
    </>
  )
}

Controls.propTypes = {
  totalCart: PropTypes.shape({
    count: PropTypes.number,
    sum: PropTypes.number
  }),
  callback: PropTypes.func
};

Controls.defaultProps = {
  callback: () => {}
}

export default React.memo(Controls);

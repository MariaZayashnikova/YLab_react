import React, {useState} from "react";
import PropTypes from 'prop-types';
import Modal from "../modal";
import List from "../list";
import Head from "../head";
import {plural} from '../../utils';
import './style.css';

function Controls({cart, callback}){
  const [isShowCart, setShowCart] = useState(false);
  let valueCart = 'пусто',
      sum = 0;

  if(cart.length > 0) {
    cart.forEach(item => {
      sum += item.count * item.price;
    });
    valueCart = `${cart.length} ${plural(cart.length, {one: 'товар', few: 'товара', many: 'товаров'})} / ${sum} ₽`;
  } 

  const onSetShowCart = () => setShowCart(!isShowCart);

  return (
    <>
      <div className='Controls'>
        <div className='Controls-Cart'>
          <span>В корзине:</span>
          <span className='Controls-Cart_font-weight-bold'>
            {valueCart}
          </span>
          <div className="Controls-Cart_button">
            <button onClick={() => onSetShowCart()}>Перейти</button>
          </div>
        </div>
      </div>
      {isShowCart ? (
        <Modal callback={onSetShowCart} sum={sum}>
          <Head title='Корзина'/>
          <div className='List-item delimiter'/>
          <List list={cart}
                action="Удалить"
                callback={callback}/>
      </Modal>
      ) : null} 
    </>
  )
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    price: PropTypes.number
  })),
  callback: PropTypes.func
};

Controls.defaultProps = {
  callback: () => {}
}

export default React.memo(Controls);

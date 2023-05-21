import React from "react";
import PropTypes from 'prop-types';
import Head from "../head";
import './style.css';

function Modal({ children, callback, sum}) {
    return (
        <div className='Modal'>
            <div className='Modal-container'>
              <button className='Modal-btn-close' onClick={callback}>Закрыть</button>
              <Head title='Корзина'/>
              <div className='List-item delimiter'/>
                {children}
              <div className="Modal-info">
                <div>Итого</div>
                <div>{sum.toLocaleString()} ₽</div>
                <span/>
              </div>
              <div className="delimiter"/>
            </div>
        </div>
    )
}

Modal.propTypes = {
  children: PropTypes.node,
  sum: PropTypes.number,
  callback: PropTypes.func
};
  
Modal.defaultProps = {
  callback: () => {}
}

export default Modal;
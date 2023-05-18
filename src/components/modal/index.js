import React from "react";
import './style.css';

function Modal({ children, callback, sum}) {
    return (
        <div className='Modal'>
            <div className='Modal-container'>
            <button className='Modal-btn-close' onClick={callback}>Закрыть</button>
              {children}
              <div>
             Итого {sum}₽
              </div>
            </div>
        </div>
    )
}

export default Modal;
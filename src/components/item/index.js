import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){
  return (
    <div className='Item'>
      <div>
        <div className='Item-code'>{props.item.code}</div>
        <div className='Item-title'>
          {props.item.title}
        </div>
      </div>
      <div>
        <div className='Item-price'>
          {props.item.price.toLocaleString()} ₽
        </div>
        {props.item.count ? (
          <div className='Item-count'>
            {props.item.count} шт
          </div>
        ) : null}
        <div className='Item-actions'>
          <button onClick={() => props.callback(props.item.code)}>
            {props.action}
          </button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  action: PropTypes.string,
  callback: PropTypes.func
};

Item.defaultProps = {
  callback: () => {}
}

export default React.memo(Item);

import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import {numberFormat} from "../../../utils";
import './style.css';

function ItemDescription({item, onAddToBasket}) {
  const cn = bem('ItemDescription');
  return (
    <div className={cn()}>
      <p className={cn('description')}>{item.description}</p>
        <p>
          Страна производитель: 
          <span> {item.madeIn?.title} ({item.madeIn?.code})</span>
        </p>
        <p>
          Категория: 
          <span> {item.category?.title}</span>
        </p>
        <p>
          Год выпуска: 
          <span> {item.edition}</span>
        </p>
        <p className={cn('price')}>
          Цена: 
          <span> {numberFormat(item.price)} ₽</span>
        </p>
        <p>
          <button onClick={() => onAddToBasket(item._id)}>Добавить</button>
        </p>
    </div>
  )
}

ItemDescription.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string
  }).isRequired,
  onAddToBasket: PropTypes.func,
}

ItemDescription.defaultProps = {
  onAddToBasket: () => {},
}

export default memo(ItemDescription);
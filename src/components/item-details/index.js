import {memo, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import PageLayout from '../page-layout';
import Head from '../head';
import BasketTool from '../basket-tool';
import ItemDescription from './item-description';
import Controls from '../controls';
import Navigation from '../navigation';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function ItemDetails() {
  let params = useParams();

  const store = useStore();
  
  const select = useSelector(state => ({
    item: state.item.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Зыкрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store])
  }

  useEffect(() => {
    store.actions.item.load(params.itemId);
    callbacks.closeModal();
  }, [params.itemId]);

  return (
    <PageLayout>
      <Head title={select.item.title}/>
      <Controls>
        <Navigation/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      </Controls>
      <ItemDescription item={select.item} onAddToBasket={callbacks.addToBasket}/>     
    </PageLayout>
  )
}

export default memo(ItemDetails)
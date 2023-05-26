import {memo, useCallback, useEffect} from 'react';
import {useHref} from 'react-router-dom';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Controls from '../../components/controls';
import Navigation from '../../components/navigation';

function Main() {

  const store = useStore();
  let href = useHref();

  useEffect(() => {
    store.actions.catalog.load(+href.replace(/\D/g, ''));
  }, [href]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    amountElements: state.catalog.amountElements
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls>
        <Navigation/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      </Controls>
      <List list={select.list} renderItem={renders.item}/>   
      <Pagination amount={select.amountElements}/>
    </PageLayout>
  );
}

export default memo(Main);

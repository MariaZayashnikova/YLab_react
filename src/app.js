import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalCart = store.getState().totalCart;

  const [isShowCart, setShowCart] = useState(false);
  const onSetShowCart = () => setShowCart(!isShowCart);

  const callbacks = {
      onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    onRemoveFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls totalCart={totalCart}
                cart={cart}
                callback={onSetShowCart}/>
      <List list={list}
            action="Добавить"
            callback={callbacks.onAddToCart}/>
      {isShowCart ? (
        <Modal callback={onSetShowCart} sum={totalCart.sum}>
          <List list={cart}
                action="Удалить"
                callback={callbacks.onRemoveFromCart}/>
      </Modal>
      ) : null}      
    </PageLayout>
  );
}

export default App;

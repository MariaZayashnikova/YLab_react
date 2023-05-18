import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onShowCart: () => {
      console.log('show cart')
    },

    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cart={cart}
                onShowCart={callbacks.onShowCart}/>
      <List list={list}
            onAddToCart={callbacks.onAddToCart}/>
    </PageLayout>
  );
}

export default App;

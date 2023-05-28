import {useCallback, useContext, useEffect, useState} from 'react';
import {Route, Routes, useNavigate, useHref} from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import ItemDetails from './item-details';
import {createActiveRoutes} from '../utils';
import ErrorRoute from '../components/Error-route';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  let navigate = useNavigate();
  let href = useHref();

  useEffect(() => {
    if(href === '/') navigate('page1');
  }, [href]);

  const select = useSelector(state => ({
    pagesAmount: state.catalog.pagesAmount
  }));

  let resultRoutes = createActiveRoutes(+href.replace(/\D/g, ''), select.pagesAmount)

  return (
    <>
      <Routes>
        <Route path='/'  element={<Main/>}>
          <Route path='page1' element={<Main/>}/>
          {resultRoutes.map((item, i) => {
            if(Number.isFinite(item)) {
              return (
                <Route key={i} path={`page${item}`} element={<Main/>}/>
              )
            }
          })}
          <Route path={`page${select.pagesAmount}`} element={<Main/>}/>
        </Route>
        <Route path='/product/:itemId' element={<ItemDetails/>}/>
        <Route path='/error' element={<ErrorRoute/>}/>
        <Route path='*' element={<ErrorRoute/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;

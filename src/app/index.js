import {useCallback, useContext, useEffect, useState} from 'react';
import {Route, Routes, useNavigate, useHref} from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import ItemDetails from '../components/item-details';
import {createActiveRoutes} from '../utils';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  let navigate = useNavigate();
  let href = useHref();

  useEffect(() => {
    if(href === '/') navigate('1');
  }, [href]);

  const select = useSelector(state => ({
    amountElements: state.catalog.amountElements
  }));

  let maxPage = Math.ceil(select.amountElements / 10);
  let resultRoutes = createActiveRoutes(+href.replace(/\D/g, ''), maxPage)

  return (
    <>
      <Routes>
        <Route path='/'  element={<Main/>}>
          <Route path='1' element={<Main/>}/>
          {resultRoutes.map((item, i) => {
            if(Number.isFinite(item)) {
              return (
                <Route key={i} path={`${item}`} element={<Main/>}/>
              )
            }
          })}
          <Route path={`${maxPage}`} element={<Main/>}/>
        </Route>
        <Route path=':itemId' element={<ItemDetails/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;

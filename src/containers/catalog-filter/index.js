import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    filter: state.catalog.params.filter,
    categoriesList: state.catalog.categoriesList
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Фильтр по категориям
    onFilter: useCallback(filter => store.actions.catalog.setParams({filter}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

let filter = [
  {value: 'all', title: "Все"}
];

function createFilter() {
  //@todo отрефакторить
  let list = select.categoriesList.filter(item => item.parent === null);
  list.forEach(elem => {
    elem.children = select.categoriesList.filter(item => item.parent?._id === elem._id);
  })
  list.forEach(elem => {
    elem.children.forEach(child => {
      child.children = select.categoriesList.filter(item => item.parent?._id === child._id);
    })
  })

  list.forEach(item => {
    let obj = {};
    obj.value = item._id;
    obj.title = item.title;
    filter.push(obj);
    obj = {}
    if(item.children.length > 0) {
      item.children.forEach(child => {
        obj.value = child._id;
        obj.title ='- ' + child.title;
        filter.push(obj);
        obj = {}
        if(child.children.length > 0) {
          child.children.forEach(elem => {
            obj.value = elem._id;
            obj.title ='- - ' + elem.title;
            filter.push(obj);
            obj = {}
          })
        }
      })
    }
  })
}
  createFilter();

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    filter: filter
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={options.filter} value={select.filter} onChange={callbacks.onFilter}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);

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
    categoriesList: state.categories.list
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Фильтр по категориям
    onFilter: useCallback(filter => store.actions.catalog.setParams({filter, page: 1}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  let filter = [
    {value: 'all', title: "Все"}
  ];

  function createFilter() {
    //@todo попробовать сократить
    function addCategoryToFilter(data, prefix) {
      filter.push({value: data._id, title: prefix + data.title});
    }
    let categories = [];
    // копируем массив объектов, чтобы не менялся исходный
    select.categoriesList.forEach(item => {
      let newObj = {};
      Object.assign(newObj, item);
      categories.push(newObj);
    });

    let list = categories.filter(item => item.parent === null);
    list.forEach(elem => {
      addCategoryToFilter(elem, '');
      elem.children = categories.filter(item => item.parent?._id === elem._id);
      elem.children.forEach(child => {
        addCategoryToFilter(child, '- ');
        child.children = categories.filter(item => item.parent?._id === child._id);
        child.children.forEach(element => {
          addCategoryToFilter(element, '- - ');
        })
      })
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
             delay={1000} theme='big'/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);

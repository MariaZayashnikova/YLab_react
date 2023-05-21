import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }

  addToCart(code) {
    let newCart = [...this.state.cart];
    let newTotalCart = {...this.state.totalCart};
    let existItemIndex = newCart.findIndex(item => item.code === code);

    if(existItemIndex > -1) {
      newCart[existItemIndex].count = newCart[existItemIndex].count + 1;
      newTotalCart.sum = newTotalCart.sum + newCart[existItemIndex].price;
    } else {
      let newItem = this.state.list.find(item => item.code === code);
      newItem.count = 1;
      newCart.push(newItem);
      newTotalCart.sum = newTotalCart.sum + newItem.price;
      newTotalCart.count = newTotalCart.count + 1;
    }

    this.setState({
      ...this.state,
      cart: newCart,
      totalCart: newTotalCart
    })
  }

  deleteItemFromCart(code) {
    let deletedItem = this.state.cart.find(item => item.code === code);
    let newTotalCart = {...this.state.totalCart};
    newTotalCart.sum = newTotalCart.sum - deletedItem.count * deletedItem.price;
    newTotalCart.count = newTotalCart.count - 1;
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      totalCart: newTotalCart
    })
  };
}

export default Store;

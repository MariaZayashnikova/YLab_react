// Начальное состояние
const initialState = {
    data: [],
    count: 0,
    waiting: false // признак ожидания загрузки
  }
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return { ...state, data: [], count: 0, waiting: true};
  
      case "comments/load-success":
        return { ...state, data: action.payload.data.items, count: action.payload.data.count,  waiting: false};

      case "comments/addNewComment/load-success":
        let newData = [...state.data];
        newData.push(action.payload.data);
        return { ...state, data: newData, count: state.count + 1,  waiting: false};
  
      case "comments/load-error":
        return { ...state, data: [], waiting: false};
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;
export default {
    /**
     * Загрузка комментариев
     * @param id
     * @return {Function}
     */
    load: (id) => {
      return async (dispatch, getState, services) => {
        // Сброс текущих комментариев и установка признака ожидания загрузки
        dispatch({type: 'comments/load-start'});
  
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?search%5Bparent%5D=${id}&limit=*&skip=0&fields=%2A`
          });
                // Комментарии загружены успешно
          dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
  
        } catch (e) {
          //Ошибка загрузки
          dispatch({type: 'comments/load-error'});
        }
      }
    },

    addNewComment: (data) => {
      return async (dispatch, getState, services) => {
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?lang=ru&fields=%2A`,
            method: 'POST',
            body: JSON.stringify(data)
          });
  
        } catch (e) {
          //Ошибка загрузки
          dispatch({type: 'comments/load-error'});
        }
      }
    }
  }
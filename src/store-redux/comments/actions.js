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
            url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type,_tree)),count`
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
            url: `/api/v1/comments?lang=ru&fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type,_tree)`,
            method: 'POST',
            body: JSON.stringify(data)
          });
          
          dispatch({type: 'comments/addNewComment/load-success', payload: {data: res.data.result}});
          
        } catch (e) {
          //Ошибка загрузки
          dispatch({type: 'comments/load-error'});
        }
      }
    }
  }
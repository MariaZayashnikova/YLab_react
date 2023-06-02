import StoreModule from "../module";

/**
 * Ифнормация о пользователе
 */
class UserState extends StoreModule {

  initState() {
    return {
      user: null,
      waiting: false, // признак ожидания загрузки
      error: false
    }
  }

  async signIn(data) {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    const json = await response.json();
    if(json.result) {
      let user ={
        token: json.result.token,
        name: json.result.user.profile.name,
        phone: json.result.user.profile.phone,
        email: json.result.user.email
      }
  
      localStorage.setItem('token', JSON.stringify(json.result.token));
  
      this.setState({
          ...this.getState(),
          user: user,
          waiting: false,
          error: false
        }, 'Авторизация пройдена');
    } else {
      this.setState({
        ...this.getState(),
        waiting: false, 
        error: json.error.data.issues[0].message
      }, 'Авторизация не пройдена');
    }
  }

  async checkAuthorizationToken() {
    if(!localStorage.getItem('token')) return;

    const token = JSON.parse(localStorage.getItem('token'));

    const response = await fetch('/api/v1/users/self', {
      method: 'GET',
      headers: {
        'X-Token': token,
        'Content-type': 'application/json'
      },
    });

    const json = await response.json();

    if(!json.result) localStorage.clear();
    else {
      let user ={
        token: token,
        name: json.result.profile.name,
        phone: json.result.profile.phone,
        email: json.result.email
      }
  
      this.setState({
          ...this.getState(),
          user: user,
          waiting: false,
          error: false
        }, 'Авторизация пройдена');
    }
  }

  async signOut() {
    const token = this.getState().user.token;
    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Content-type': 'application/json'
      },
    });

    const json = await response.json();

    localStorage.clear();

    this.setState({
        ...this.getState(),
        user: null,
        waiting: false
      }, 'Пользователь вышел');
  }

  clearError() {
    this.setState({
      ...this.getState(),
      error: false
    }, 'Сброс ошибки');
  }
}

export default UserState;

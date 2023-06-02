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

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const json = await response.json();
      let user ={
          token: json.result.token,
          name: json.result.user.profile.name,
          phone: json.result.user.profile.phone,
          email: json.result.user.email
      }
  
      localStorage.setItem('user', JSON.stringify(user));
  
      this.setState({
          ...this.getState(),
          user: user,
          waiting: false,
          error: false
        }, 'Авторизация пройдена');
    } catch(e) {
      this.setState({
        ...this.getState(),
        waiting: false, 
        error: true
      }, 'Авторизация не пройдена');
    }
  }

  checkUserLocal() {
    if(localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.setState({
        ...this.getState(),
        user: user
      }, 'Проверка авторизации выполнена успешно');
    }
  }

  async checkAuthorizationToken() {
    const token = this.getState().user.token;

    const response = await fetch('/api/v1/users/self', {
      method: 'GET',
      headers: {
        'X-Token': token,
        'Content-type': 'application/json'
      },
    });

    const json = await response.json();

    if(!json.result) {
      localStorage.clear();

      this.setState({
        ...this.getState(),
        user: null
      }, 'Авторизация не пройдена');
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
}

export default UserState;

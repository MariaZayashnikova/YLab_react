import StoreModule from "../module";

/**
 * Ифнормация о пользователе
 */
class UserState extends StoreModule {

  initState() {
    return {
      user: null,
      waiting: false // признак ожидания загрузки
    }
  }

  async signIn(data) {
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
        waiting: false
      }, 'Авторизация пройдена');
  }

  checkUser() {
    if(localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.setState({
        ...this.getState(),
        user: user
      }, 'Проверка авторизации выполнена успешно');
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

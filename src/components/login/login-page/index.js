import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginPage(props) {

  const cn = bem('LoginPage');

  function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = {
        'login': formData.get('login'),
        'password': formData.get('password')
    }
    props.onSignIn(data);
  }

  return (
    <div className={cn()}>
      <h2>Вход</h2>
      <form id='loginForm' onSubmit={onSubmit} className={cn('form')}>
        <div className={cn('item')}>
          <div>Логин</div>
          <input type='text' id='login' name='login'/>
        </div>
        <div className={cn('item')}>
          <div>Пароль</div>
          <input type='password' id='password' name='password'/>
        </div>
        {props.isError ? (
          <div className={cn('error')}>
          Проверьте правильность введенных данных
        </div>
        ) : null}
        <div className={cn('item')}>
          <button type='submit'>Войти</button>
        </div>
      </form>
    </div>
  );
}

LoginPage.propTypes = {
  onSignIn: PropTypes.func
};

LoginPage.defaultProps = {
  onSignIn: () => {}
};

export default memo(LoginPage);

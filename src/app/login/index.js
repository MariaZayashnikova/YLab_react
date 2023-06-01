import {memo, useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LoginPage from '../../components/login/login-page';
import LoginNav from '../../containers/login-nav';

function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.user,
    waiting: state.user.waiting,
    error: state.user.error,
  }));

  const callbacks = {
    onSignIn: useCallback(data => store.actions.user.signIn(data), [store]),
    onCheckUser: useCallback(() => store.actions.user.checkUser(), [store]),
  }

  useInit(() => {
    callbacks.onCheckUser();
  }, []);

  let navigate = useNavigate();
  const {t} = useTranslate();
  useInit(() => {
    if(select.user) navigate('/profile')
  }, [select.user])

  return (
    <PageLayout>
      <LoginNav/>
      <Head title={t('title')}/>
      <Navigation/>
      <Spinner active={select.waiting}>
        <LoginPage onSignIn={callbacks.onSignIn} isError={select.error}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);

import {memo, useCallback, useEffect} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
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
  let navigate = useNavigate();
  const {t} = useTranslate();
  const location = useLocation();

  const select = useSelector(state => ({
    user: state.profile.user,
    waiting: state.profile.waiting,
    error: state.profile.error,
  }));

  const callbacks = {
    onSignIn: useCallback(data => store.actions.profile.signIn(data), [store])
  }

  useEffect(() => {
    if(select.user) navigate('/profile');
  }, [select.user]);

  useEffect(() => {
    if(select.error) store.actions.profile.clearError();
  }, [location.pathname]);

  return (
    <PageLayout>
      <LoginNav/>
      <Head title={t('title')}/>
      <Navigation/>
      <Spinner active={select.waiting}>
        <LoginPage onSignIn={callbacks.onSignIn} errorMessage={select.error ? select.error : null}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);

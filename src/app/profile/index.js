import {memo, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LoginNav from '../../containers/login-nav';
import ProfileDetails from '../../components/profile-details'

function Profile() {
  
  const select = useSelector(state => ({
    user: state.profile.user
  }));

  const navigate = useNavigate();
  const {t} = useTranslate();
  
  useEffect(() => {
    if(!select.user) navigate('/login');
  }, [select.user])

  return (
    <PageLayout>
      <LoginNav/>
      <Head title={t('title')}/>
      <Navigation/>
      <ProfileDetails user={select.user}/>
    </PageLayout>
  );
}

export default memo(Profile);
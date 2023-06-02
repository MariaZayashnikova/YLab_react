import {memo, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import LoginDetails from "../../components/login/login-details";
import SideLayout from "../../components/side-layout";

function LoginNav() {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.profile.user
  }));

  const callbacks = {
    onSignOut: useCallback(() => store.actions.profile.signOut(), [store]),
  }

  return (
    <SideLayout side="end" padding='small'>
      <LoginDetails user={select.user}
                    linkPath={{profile: '/profile', login: '/login'}}
                    action={select.user ? 'Выход' : 'Вход'}
                    onSignOut={callbacks.onSignOut}/>
    </SideLayout>
  );
}

export default memo(LoginNav);

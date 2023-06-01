import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginDetails(props) {

  const cn = bem('LoginDetails');

  return (
    <div className={cn()}>
      {props.user ? <Link to={`${props.linkPath.profile}`}>{props.user.name}</Link> : null}
      {props.user ? (
       <button onClick={props.onSignOut}>{props.action}</button>
      ) : (
      <button>
        <Link to={`${props.linkPath.login}`} className={cn('button')}>{props.action}</Link>
      </button>
      )}
    </div>
  );
}

LoginDetails.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  linkPath: PropTypes.shape({
    profile: PropTypes.string,
    login: PropTypes.string,
  }),
  action: PropTypes.string,
  onSignOut: PropTypes.func
};

LoginDetails.defaultProps = {
  onSignOut: () => {}
};

export default memo(LoginDetails);

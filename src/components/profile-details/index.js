import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileDetails(props) {

  const cn = bem('ProfileDetails');

  return (
    <div className={cn()}>
       <h2>Профиль</h2>
       <div className={cn('item')}>
        <span>Имя:</span>
        <span className={cn('item-bold')}> {props.user?.name}</span>
       </div>
       <div className={cn('item')}>
        <span>Телефон:</span>
        <span className={cn('item-bold')}> {props.user?.phone}</span>
       </div>
       <div className={cn('item')}>
        <span>Email:</span>
        <span className={cn('item-bold')}> {props.user?.email}</span>
       </div>
    </div>
  );
}

ProfileDetails.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
  })
};

ProfileDetails.defaultProps = {
  user: PropTypes.shape({
    name: '',
    phone: '',
    email: '',
  })
};

export default memo(ProfileDetails);
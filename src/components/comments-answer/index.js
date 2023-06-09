import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import './style.css';

function CommentsAnswer(props) {
  const cn = bem('CommentsAnswer');

  function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = {
      'text': formData.get('text')
    }
    props.addCallback(data);
    e.target.reset();
    props.setParentIdAnswer(null);
  }

  return (
    <div className={cn()}>
      {props.isAuthorization ? (
        <form onSubmit={onSubmit} className={cn('new-comment')}>
          <div className={cn('new-comment-title')}>{props.title}</div>
          <textarea type='text' className={cn('new-comment-input')} name='text'/>
          <div>
            <button type='submit' className={cn('new-comment-add-button')}>Отправить</button>
            {props.isCancel ? <button type='button' onClick={() => props.setParentIdAnswer(null)}>Отмена</button> : null}
          </div>
        </form>
      ) : (
        <>
          <span><Link to='/login'>Войдите</Link>, чтобы иметь возможность комментировать</span>
          {props.isCancel ? (
            <>
              <span>. </span>
              <span className={cn('cancel')} onClick={() => props.setParentIdAnswer(null)}>Отмена</span>
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

CommentsAnswer.propTypes = {
  setParentIdAnswer: PropTypes.func,
  addCallback: PropTypes.func,
  isCancel: PropTypes.bool,
  isAuthorization: PropTypes.bool,
  title: PropTypes.string,
}

CommentsAnswer.defaultProps = {
  setParentIdAnswer: () => {},
  addCallback: () => {},
  isCancel: false,
  isAuthorization: false,
  title: ''
}

export default memo(CommentsAnswer);
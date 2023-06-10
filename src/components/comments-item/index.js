import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import CommentsAnswer from "../comments-answer";
import createDateForComments from "../../utils/create-date-for-comments";
import './style.css';

function CommentsItem(props) {
  const cn = bem('CommentsItem');

  let style = {
    'marginLeft': `${(props.comment.parent._tree.length - 1 )> 6 ? 30 * 6 : 30 * (props.comment.parent._tree.length - 1)}px`
  }

  return (
    <div className={cn()} style={style}>
      <div className={cn('info')}>
        <span className={props.comment.author.profile.name === props.userName ? cn('author-authorized') : cn('author')}>
          {props.comment.author.profile.name}
        </span>
        <span className={cn('date')}>{createDateForComments(props.comment.dateCreate)}</span>
      </div>
      <div className={cn('text')}>{props.comment.text}</div>
      <div className={cn('answer')} onClick={() => props.setParentIdAnswer(props.comment._id)}>Ответить</div>
      {props.parentIdAnswer === props.comment._id ? (
        <CommentsAnswer title='Новый ответ' isCancel={true} setParentIdAnswer={props.setParentIdAnswer} addCallback={props.addCallback}
        isAuthorization={props.isAuthorization}/>
      ) : null}
    </div>
  )
}

CommentsItem.propTypes = {
  setParentIdAnswer: PropTypes.func,
  addCallback: PropTypes.func,
  isAuthorization: PropTypes.bool,
  parentIdAnswer: PropTypes.string,
  userName: PropTypes.string,
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    parent: PropTypes.object,
    author: PropTypes.object
  }).isRequired,
}

CommentsItem.defaultProps = {
  setParentIdAnswer: () => {},
  addCallback: () => {},
  isAuthorization: false,
  parentIdAnswer: null,
  userName: ''
}

export default memo(CommentsItem);
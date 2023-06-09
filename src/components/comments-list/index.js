import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import CommentsItem from '../comments-item';
import CommentsAnswer from "../comments-answer";
import './style.css';

function CommentsList(props) {
  const cn = bem('CommentsList');
  
  const [parentIdAnswer, setParentIdAnswer] = useState(null);

  function createDataNewComment(value) {
    let data = {
      'text': value.text
    };
    if(parentIdAnswer !== null) {
      data.parent = {
        '_id': parentIdAnswer,
        '_type': 'comment'
      }
    } else {
      data.parent = {
        '_id': props.articleId,
        '_type': 'article'
      }
    }
    props.addCallback(data);
  }
  
  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии({props.count})</div>
      {props.count > 0 ? props.comments.map(comment => {
        return <CommentsItem key={comment._id} comment={comment} setParentIdAnswer={setParentIdAnswer}
                             parentIdAnswer={parentIdAnswer} addCallback={createDataNewComment}
                             isAuthorization={props.isAuthorization}/>
      }) : null}
      {parentIdAnswer === null ? 
        <CommentsAnswer title="Новый комментарий" isCancel={false} addCallback={createDataNewComment} isAuthorization={props.isAuthorization}/>
       : null}
    </div>
  )
}

CommentsList.propTypes = {
  addCallback: PropTypes.func,
  isAuthorization: PropTypes.bool,
  articleId: PropTypes.string,
  count: PropTypes.number,
  comments: PropTypes.array
}

CommentsList.defaultProps = {
  addCallback: () => {},
  isAuthorization: false,
  count: 0,
  comments: []
}

export default memo(CommentsList);
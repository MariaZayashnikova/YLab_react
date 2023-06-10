import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import CommentsItem from '../comments-item';
import CommentsAnswer from "../comments-answer";
import './style.css';

function CommentsList(props) {
  const cn = bem('CommentsList');
  
  const [parentIdAnswer, setParentIdAnswer] = useState(null);
  const [idAnswer, setIdAnswer] = useState(null);

  const findParentIdAnswer = (id) => {
    setIdAnswer(id);
    if(id === null) {
      setParentIdAnswer(null);
    } else {
      let mainParent = props.comments.filter(item => item.parent._id === id);
      if(mainParent.length === 0) {
        setParentIdAnswer(id);
      } else {
        setParentIdAnswer(mainParent[mainParent.length - 1]._id);
      }
    }
  }

  function createDataNewComment(value, id) {
    let data = {
      'text': value.text
    };
    if(idAnswer !== null) {
      data.parent = {
        '_id': idAnswer,
        '_type': 'comment'
      }
    } else {
      data.parent = {
        '_id': props.data.articleId,
        '_type': 'article'
      }
    }
    props.addCallback(data);
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии({props.data.count})</div>
      {props.data.count > 0 ? props.comments.map(comment => {
        return <CommentsItem key={comment._id} comment={comment} setParentIdAnswer={findParentIdAnswer}
                             parentIdAnswer={parentIdAnswer} addCallback={createDataNewComment}
                             isAuthorization={props.data.isAuthorization} userName={props.data.userName}/>
      }) : null}
      {parentIdAnswer === null ? 
        <CommentsAnswer title="Новый комментарий" isCancel={false} addCallback={createDataNewComment} isAuthorization={props.data.isAuthorization}/>
       : null}
    </div>
  )
}

CommentsList.propTypes = {
  addCallback: PropTypes.func,
  comments: PropTypes.array,
  data: PropTypes.shape({
    count: PropTypes.number,
    articleId: PropTypes.string,
    isAuthorization: PropTypes.bool,
    userName: PropTypes.string
  })
}

CommentsList.defaultProps = {
  addCallback: () => {},
  data: {
    isAuthorization: false,
    count: 0,
    comments: [],
    userName: ''
  }
}

export default memo(CommentsList);
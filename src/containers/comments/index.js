import {memo} from "react";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import CommentsList from "../../components/comments-list";
import commentsActions from '../../store-redux/comments/actions';
import treeToList from "../../utils/tree-to-list";

function Comments({articleId}) {
  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data,
    commentsCount: state.comments.count,
    waiting: state.comments.waiting
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const select = useSelector(state => ({
    exists: state.session.exists
  }));

  const dispatch = useDispatch();

  function addNewComment(data) {
    dispatch(commentsActions.addNewComment(data))
      .then(() => dispatch(commentsActions.load(articleId)));
  }

  let listComments = [];

  function createTree() {
    let newList = [];
    // копируем массив объектов, чтобы не менялся исходный
    selectRedux.comments.items.forEach(item => {
      let newObj = {};
      Object.assign(newObj, item);
      newList.push(newObj);
    });

    newList.forEach(item => {
      item.children = newList.filter(elem => elem.parent?._id === item._id);
    });

    listComments = treeToList(newList.filter(item => item.parent._type === 'article'));
  }

  if(selectRedux.commentsCount > 0) createTree();
  
  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsList count={selectRedux.commentsCount} comments={listComments} addCallback={addNewComment} articleId={articleId}
                    isAuthorization={select.exists}/>
    </Spinner>
  )
}

export default memo(Comments);

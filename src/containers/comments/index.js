import {memo} from "react";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import CommentsList from "../../components/comments-list";
import commentsActions from '../../store-redux/comments/actions';
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";

function Comments({articleId}) {
  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data,
    commentsCount: state.comments.count,
    waiting: state.comments.waiting
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const select = useSelector(state => ({
    exists: state.session.exists,
    user: state.session.user
  }));

  const dispatch = useDispatch();

  function addNewComment(data) {
    dispatch(commentsActions.addNewComment(data));
  }

  let dataForList = {
    count: selectRedux.commentsCount,
    articleId: articleId,
    isAuthorization: select.exists,
    userName: select.user?.profile?.name
  }

  let listComments = [];

  if(selectRedux.commentsCount > 0) {
    let newList = [];

    selectRedux.comments.forEach(item => {
      let newObj = {};
      Object.assign(newObj, item);
      newList.push(newObj);
    });
      
    listComments = treeToList(listToTree(newList));
  }

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsList data={dataForList} comments={listComments} addCallback={addNewComment}/>
    </Spinner>
  )
}

export default memo(Comments);

import {memo, useCallback, useMemo, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import Comments from '../../containers/comments';
import myUseTranslate from '../../hooks/myUse';

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();
  useInit(async () => {
    await Promise.all([
    dispatch(articleActions.load(params.id)),
    dispatch(commentsActions.load(params.id))
    ]);
  }, [params.id]);
  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект
  const {t} = useTranslate();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  const {i18n, lang} = myUseTranslate();
  const [state, setState] = useState(i18n)

const translate = myUseTranslate((state) => {
  setState(state)
});
console.log(state)


  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={i18n.translate}/>
      </Spinner>
      <Comments articleId={select.article._id}/>
    </PageLayout>
  );
}

export default memo(Article);

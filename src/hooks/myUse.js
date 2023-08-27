import {useCallback, useContext, useMemo, useLayoutEffect, useState, useEffect} from "react";
// import translate from "../i18n/translate";
import useI18n from './use-services';
import useServices from "./use-services";
import shallowequal from 'shallowequal';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function myUseTranslate(selectorFunc = () => {}) {
 const i18n = useServices().i18n;

 const [lang, setLang] = useState(i18n.local);
 
  useEffect(() => {
    i18n.setLocal(lang);
  }, [lang])

  const [state, setState] = useState(i18n);

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return i18n.subscribe((value) => {
      console.log('действие после подписки')
      selectorFunc(value);
      setState(value)
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return {
    i18n,
    lang,
    setLang,
    state
  };
}


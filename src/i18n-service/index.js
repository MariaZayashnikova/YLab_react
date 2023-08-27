import * as translations from './translations';

class I18nService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}, local = 'ru') {
    this.services = services;
    this.config = config;
    this.local = local;
    this.defaultLocal = 'ru';
    this.listeners = [];
  }

  translate = (text, plural) => {
    console.log('translate')
    let result = translations[this.local] && (text in translations[this.local])
      ? translations[this.local][text]
      : text;
  
    if (typeof plural !== 'undefined'){
      const key = new Intl.PluralRules(this.local).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  setLocal = (value = null) => {
    if (value) {
      this.local = value;
    } 
    for (const listener of this.listeners) listener(this);
  }

  getLocal = () => {
    return this.local;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
  
}

export default I18nService;

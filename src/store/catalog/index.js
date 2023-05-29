import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      pagesAmount: 0,
      currentPage: 0
    }
  }

  async load() {
    let skip = 0;
    let pageNow = this.getState()['currentPage'];  
    if(pageNow > 1) skip = (pageNow -1 ) * 10;

    let itemsResponse = await fetch(`/api/v1/articles?limit=10&skip=${skip}`);
    let itemsJson = await itemsResponse.json();

    let itemsMaxCountResponse = await fetch('/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count');
    let itemsMaxCountJson = await itemsMaxCountResponse.json();

    this.setState({
       ...this.getState(),
       list: itemsJson.result.items,
       pagesAmount: Math.ceil(itemsMaxCountJson.result.count / 10)
    }, 'Загружены товары из АПИ');
  }

  setCurrantPage(currentPage) {
      this.setState({
       ...this.getState(),
       currentPage: currentPage
    }, 'Установлена текущая страница');
  }
}

export default Catalog;

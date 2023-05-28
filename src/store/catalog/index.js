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
      pagesAmount: 0
    }
  }

  async load(currentPage) {
    let skip = 0;  
    if(currentPage > 1) skip = (currentPage -1 ) * 10;

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
}

export default Catalog;

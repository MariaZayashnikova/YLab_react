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
      amountElements: 0
    }
  }

  async load(currentPage) {
    let newList, newAmountElements,
        skip = 0;  
    if(currentPage > 1) skip = (currentPage -1 ) * 10;

    let response = await fetch(`/api/v1/articles?limit=10&skip=${skip}`);
    let json = await response.json();
    newList = json.result.items;

    response = await fetch('/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count');
    json = await response.json();
    newAmountElements = json.result.count;

    this.setState({
       ...this.getState(),
       list: newList,
       amountElements: newAmountElements
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;

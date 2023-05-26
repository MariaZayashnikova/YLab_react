import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Item extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      item: {}
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result
    }, 'Загружены товары из АПИ');
  }
}

export default Item;
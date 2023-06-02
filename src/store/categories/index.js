import StoreModule from "../module";

/**
 * Ифнормация о категориях
 */
class CategoriesState extends StoreModule {

  initState() {
    return {
      list: [],
      waiting: false,
      error: false
    }
  }

  async getCategories() {
    this.setState({
        ...this.getState(),
        waiting: true
    });

    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      waiting: false
    }, 'Загружен список категорий из АПИ');
  }
}

export default CategoriesState;

import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  addItem({ count, unit, ingredient }) {
    let ifIng = false;

    this.items.forEach((el) => {
      if (el.ingredient === ingredient) {
        el.count += count;
        ifIng = true;
      }
    });

    if (!ifIng) {
      const item = {
        id: uniqid(),
        count,
        unit,
        ingredient,
      };

      this.items.push(item);
    }
  }

  updateList(id, value) {
    this.items.forEach((el) => (el.count = el.id === id ? value : el.count));
  }

  deleteList(id) {
    const index = this.items.findIndex((el) => el.id === id);

    this.items.splice(index, 1);
  }
}

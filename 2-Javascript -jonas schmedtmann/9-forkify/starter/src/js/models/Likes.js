export default class Likes {
  constructor() {
    this.list = [];
  }

  addFavourites(id, img, title, author) {
    let state = false;
    this.list.forEach((el) => {
      if (el.id === id) {
        state = true;
      }
    });
    if (!state) {
      const obj = {
        id,
        img,
        title,
        author,
      };

      this.list.push(obj);
    }
  }

  deleteFavourites(id) {
    const index = this.list.findIndex((el) => el.id === id);

    this.list.splice(index, 1);
  }
}

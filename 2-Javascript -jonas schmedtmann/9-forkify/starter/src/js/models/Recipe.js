import axios from "axios";

export default class Recepie {
  constructor(id) {
    this.id = id;
  }

  async getRecepie() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
      this.isLiked = false;
    } catch (e) {
      console.log(error);
      alert("Something went wrong :(");
    }
  }

  calcTime() {
    // ing = 6 / 3 = 2 * 15
    // Assuming that we need 15 min for each 3 ingredients
    this.time = Math.ceil((this.ingredients.length / 3) * 15);
  }

  calcServings() {
    this.servings = 4;
  }

  //   ingredients: (6) […]
  // 0: "4 1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled"
  // 1: "1 3/4 (.44 ounce) teaspoons salt"
  // 2: "1 teaspoon (.11 ounce) instant yeast"
  // 3: "1/4 cup (2 ounces) olive oil (optional)"
  // 4: "1 3/4 cups (14 ounces) water, ice cold (40F)"
  // 5: "Semolina flour OR cornmeal for dusting"

  modifyIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ];
    const units = [...unitsShort, "kg", "g"];

    const newIng = this.ingredients.map((el) => {
      let ingredient = el.toLowerCase();

      unitsLong.forEach((cur, i) => {
        ingredient = ingredient.replace(cur, units[i]);
      });

      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      const arr = ingredient.split(" ");
      const unitIndex = arr.findIndex((el2, i) => units.includes(el2));

      let objIng;

      if (unitIndex > -1) {
        const arrCount = arr.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count = parseInt(arrCount[0]);
        } else {
          count = eval(arrCount.join("+"));
        }

        objIng = {
          count,
          unit: arr[unitIndex],
          ingredient: arr.slice(unitIndex + 1).join(" "),
        };
      } else if (parseInt(arr[0])) {
        objIng = {
          count: parseInt(arr[0]),
          unit: "",
          ingredient: arr.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        objIng = {
          count: 1,
          unit: "",
          ingredient,
        };
      }

      return objIng;
    });
    this.ingredients = newIng;
  }

  updateServings(type) {
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

    this.ingredients.forEach((el) => (el.count *= newServings / this.servings));
    this.servings = newServings;
  }
}

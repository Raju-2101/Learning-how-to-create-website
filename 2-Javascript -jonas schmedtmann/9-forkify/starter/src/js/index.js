// Global app controller
import Search from "./models/Search";
import { elements } from "./views/base";
import { getInput, pagination, reload, clearList } from "./views/searchView";
import Recipe from "./models/Recipe";
import { recipeView, clearRecipe } from "./views/recepieView";
import List from "./models/Lists";
import { listView, clearShopping, deleteList } from "./views/listsView";
import Likes from "./models/Likes";
import { likesView, clearLikes } from "./views/likesViews";

//global object

const state = {};
state.likes = new Likes();

const controlSearch = async () => {
  try {
    // getting input value
    const inputValue = getInput();

    // enable button crearing datas in UI
    clearList();

    // providing reload UI
    reload(elements.sidePanel);

    // disable button if input value is empty
    if (!inputValue) {
      throw new Error("provide input value");
    }
    // creating new search incent
    state.search = new Search(inputValue);
    await state.search.getResults();

    clearList();

    // rendering to user
    pagination(state.search.result);
  } catch (e) {
    clearList();
    console.log(e);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.pageBtn.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const page = parseInt(btn.dataset.goto, 10);
    clearList();
    pagination(state.search.result, page);
  }
});

// Recipe controller

const ctrlRecipe = async () => {
  try {
    clearRecipe();

    if (window.location.hash) {
      // reload UI
      reload(elements.recipe);

      const id = window.location.hash.replace("#", "");

      state.recipe = new Recipe(id);
      await state.recipe.getRecepie();
      state.recipe.calcTime();
      state.recipe.modifyIngredients();
      state.recipe.calcServings();

      clearRecipe();

      state.likes.list.forEach((el) => {
        if (el.id === id) {
          state.recipe.isLiked = true;
        }
      });

      recipeView(state.recipe);
    }
  } catch (e) {
    alert("something went wrong");
  }
};

// list controller

const ctrlList = () => {
  if (!state.list) {
    state.list = new List();
  }

  state.recipe.ingredients.forEach((el) => {
    state.list.addItem(el);
  });
  clearShopping();
  listView(state.list.items);
};

// rendering recipe
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, ctrlRecipe)
);

// adding events on recipe
elements.recipe.addEventListener("click", (e) => {
  //increase servings
  if (e.target.closest(".btn-decrease")) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      clearRecipe();
      recipeView(state.recipe);
    }
    // decerase servings
  } else if (e.target.closest(".btn-increase")) {
    state.recipe.updateServings("inc");
    clearRecipe();
    recipeView(state.recipe);
  }

  // add List
  else if (e.target.closest(".recipe__btn")) {
    ctrlList();
  }
  // add Likes
  else if (e.target.closest(".recipe__love")) {
    let set = false;

    state.likes.list.forEach((el) => {
      if (state.recipe.id === el.id) {
        state.recipe.isLiked = false;
        state.likes.deleteFavourites(state.recipe.id);
        set = true;
      }
    });

    if (!set) {
      state.recipe.isLiked = true;
      state.likes.addFavourites(
        state.recipe.id,
        state.recipe.img,
        state.recipe.title,
        state.recipe.author
      );
    }
    clearLikes();
    console.log(state.recipe.isLiked);
    clearRecipe();
    recipeView(state.recipe);
    likesView(state.likes.list);
  }
});

// Handle delete and update list item events
elements.shoppingList.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").id;

  // update count
  if (e.target.closest(".input-count")) {
    const value = parseInt(e.target.value);
    if (!value) {
      e.target.value = 0;
    }
    state.list.updateList(id, value);
  }

  // delete count
  if (e.target.closest(".shopping__delete")) {
    state.list.deleteList(id);
    console.log(state.list);
    deleteList(id);
  }
});

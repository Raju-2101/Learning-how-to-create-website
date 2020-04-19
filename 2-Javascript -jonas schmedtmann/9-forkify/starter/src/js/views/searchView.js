import { elements } from "./base";

// getting input
export const getInput = () => elements.searchInput.value;

//clearing input
export const clearList = () => {
  elements.sidePanel.innerHTML = "";
  elements.pageBtn.innerHTML = "";
};

export const reload = (parent) => {
  parent.insertAdjacentHTML(
    "beforeend",
    `
<div class="loader">
  <svg>
      <use href="img/icons.svg#icon-cw"></use>
  </svg>
</div>
  `
  );
};

export const pagination = (result, page = 1, itemsList = 10) => {
  const start = (page - 1) * itemsList;
  const end = itemsList * page;

  renderSearch(result.slice(start, end));

  renderButton(result.length, page, itemsList);
};

// filtering title

export const filterTitle = (el, stringLength) => {
  const title = el.split(" ");

  let state = "";

  title.forEach((cur) => {
    if (state.length + cur.length < stringLength) {
      if (!state) {
        return (state = cur);
      }
      state = state + " " + cur;
    }
  });
  return state;
};

const renderSearch = (recepies, stringLength = 17) => {
  recepies.forEach((el) => {
    elements.sidePanel.insertAdjacentHTML(
      "beforeend",
      `<li>
    <a class="results__link results__link--active" href="#${el.recipe_id}">
        <figure class="results__fig">
            <img src=${el.image_url} alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${filterTitle(el.title, stringLength)}${
        el.title.length > stringLength ? "..." : ""
      }</h4>
            <p class="results__author">${el.publisher}</p>
        </div>
    </a>
</li>`
    );
  });
};

const renderButton = (result, page, itemList) => {
  const createButton = (page, type) => {
    return `<button class="btn-inline results__btn--${type}" data-goto=${
      type === "prev" ? page - 1 : page + 1
    }>
  <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
  <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${
        type === "prev" ? "left" : "right"
      }"></use>
  </svg>
</button>`;
  };

  const pages = Math.ceil(result / itemList);
  let button;
  if (page === 1 && pages > 1) {
    button = createButton(page, "next");
  } else if (page < pages) {
    button = `${createButton(page, "prev")} ${createButton(page, "next")}`;
  } else if (page === pages && pages > 1) {
    button = createButton(page, "prev");
  }
  elements.pageBtn.insertAdjacentHTML("beforeend", button);
};

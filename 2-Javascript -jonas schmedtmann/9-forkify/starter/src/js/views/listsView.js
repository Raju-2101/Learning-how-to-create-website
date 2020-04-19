import { elements } from "./base";

export const listView = (items) => {
  const element = ({ id, count, unit, ingredient }) => `
    <li class="shopping__item" id=${id}>
    <div class="shopping__count">
        <input class="input-count" type="number" value=${count} step="${count}">
        <p>${unit}</p>
    </div>
    <p class="shopping__description">${ingredient}</p>
    <button class="shopping__delete btn-tiny">
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
</li>
    `;

  items.forEach((el) =>
    elements.shoppingList.insertAdjacentHTML("beforeend", element(el))
  );
};

export const clearShopping = () => {
  elements.shoppingList.innerHTML = "";
};

export const deleteList = (id) => {
  document
    .querySelector(`#${id}`)
    .parentElement.removeChild(document.querySelector(`#${id}`));
};

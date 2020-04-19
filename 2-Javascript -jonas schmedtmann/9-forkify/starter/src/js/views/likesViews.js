import { filterTitle } from "./searchView";

import { elements } from "./base";

export const likesView = (lists, stringLength = 17) => {
  //   const element = (list) => `
  //     <li>
  //     <a class="likes__link" href="#${list.id}">
  //         <figure class="likes__fig">
  //             <img src="${list.img}" alt="recipe image>
  //         </figure>
  //         <div class="likes__data">
  //             <h4 class="likes__name">${filterTitle(list.title, stringLength)}${
  //     list.title.length > stringLength ? "..." : ""
  //   }</h4>
  //             <p class="likes__author">${list.author}</p>
  //         </div>
  //     </a>
  // </li>
  //     `;

  const element = (list) => `
  <li>
  <a class="likes__link" href="#${list.id}">
      <figure class="likes__fig">
          <img src="${list.img}" alt="Test">
      </figure>
      <div class="likes__data">
          <h4 class="likes__name">${filterTitle(list.title, stringLength)}${
    list.title.length > stringLength ? "..." : ""
  }</h4>
          <p class="likes__author">${list.author}</p>
      </div>
  </a>
</li>
    `;

  lists.forEach((el) =>
    elements.likesList.insertAdjacentHTML("beforeend", element(el))
  );
  //   elements.likesList.insertAdjacentHTML("beforeend", element);
};

export const clearLikes = () => {
  elements.likesList.innerHTML = "";
};

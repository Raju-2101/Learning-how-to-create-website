const toggle = document.querySelector(".toggle");
const circle = document.querySelector(".toggle .circle");
const box1 = document.querySelector(".box1 h1");
const box2 = document.querySelector(".box2 h1");
const box3 = document.querySelector(".box3 h1");

toggle.addEventListener("click", function() {
  circle.classList.toggle("move");

  // if (circle.style.transform === "translate(5px, 3.5px)") {
  //   circle.style.transform = "translate(27px, 3.5px)";
  // } else {
  //   circle.style.transform = "translate(5px, 3.5px)";
  // }

  if (box1.textContent === "$199.99") {
    box1.textContent = "$19.99";
  } else {
    box1.textContent = "$199.99";
  }

  if (box2.textContent === "$249.99") {
    box2.textContent = "$24.99";
  } else {
    box2.textContent = "$249.99";
  }

  if (box3.textContent === "$399.99") {
    box3.textContent = "$39.99";
  } else {
    box3.textContent = "$399.99";
  }
});

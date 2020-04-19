const button = document.querySelector(".input button");
const errorIcon = document.querySelector(".input .error-icon");
const input = document.querySelector(".input input");
const errorMsg = document.querySelector(".input .error-msg");

var validForm = document
  .querySelector("form")
  .addEventListener("submit", function(event) {
    if (input.value === "") {
      errorMsg.style.display = "block";
      errorIcon.style.display = "block";
      event.preventDefault();
    }
  });

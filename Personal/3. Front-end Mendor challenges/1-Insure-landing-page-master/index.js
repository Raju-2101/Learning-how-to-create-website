const navLinks = document.querySelector(".nav-links");
const hamburger = document.querySelector(".hamburger");
const Links = document.querySelectorAll(".nav-links li");
const hamAnimate = document.querySelectorAll(".hamburger .line");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("onclick");
  Links.forEach(link => {
    link.classList.toggle("fade");
  });
  hamAnimate.forEach(line => {
    line.classList.toggle("animate");
  });

  // var img = hamburger.src;

  // if (img) {
  //   hamburger.src = "./images/icon-close.svg";
  // } else if (!img) {
  // hamburger.src = "./images/icon-hamburger.svg";
  // }

  // var img = hamburger.src;
  // if (img.indexOf("./images/icon-close.svg") != -1) {
  //   hamburger.src = "./images/icon-hamburger.svg";
  // } else {
  //   hamburger.src = "./images/icon-close.svg";
  // }
});

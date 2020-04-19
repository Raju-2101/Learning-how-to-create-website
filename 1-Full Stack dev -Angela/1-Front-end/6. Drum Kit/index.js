
// mouseclick

var numberOfKeys = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfKeys; i++) {
document.querySelectorAll(".drum")[i].addEventListener("click", function () {
 soundPress(this.innerHTML);
 buttonAnimation(this.innerHTML);
 });

}

// keyboard press

document.addEventListener("keydown", function (event) {
  soundPress(event.key);
  buttonAnimation(event.key);
} )

// function

function soundPress(key) {
  switch (key) {

    case "w":
    var tom1 = new Audio("sounds/tom-1.mp3");
    tom1.play();
      break;

      case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

      case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

      case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

      case "j":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

      case "k":
      var kickBass = new Audio("sounds/kick-bass.mp3");
      kickBass.play();
      break;

      case "l":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;


    default:
    console.log(buttonInnerHtml);

  }
}

function buttonAnimation(animation) {
  var activeButton = document.querySelector("." + animation );
  activeButton.classList.add("pressed");

  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}

// for reference

// var noOfKeys = document.querySelectorAll(".drum").length;
//
// for ( var i = 0; i < noOfKeys; i++) {
//   document.querySelectorAll(".drum")[i].addEventListener("click", function () {
//     var buttonPress = this.innerHTML;
//     fuck(buttonPress);
//   });
// }
//
// document.addEventListener("keydown", function (event) {
// fuck(event.key);
// });
//
// function fuck (key) {
//   switch (key) {
//     case "w":
//     var tom1 = new Audio("sounds/tom-1.mp3");
//     tom1.play();
//       break;
//     default:
//
//   }
// }

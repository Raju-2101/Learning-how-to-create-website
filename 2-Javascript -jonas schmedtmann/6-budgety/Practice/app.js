var app = (function () {
  // .
  // .
  // budget controller
  // returns public methods
  // (calculate, save and create item and object using constructor functions)
  var budgetController = (function () {
    // creating constructor functions

    // constructor function for incomes and expenses
    var Item = function (id, desc, value) {
      this.id = id;
      this.desc = desc;
      this.value = value;
    };

    var calcPercent = function (exp, totalInc) {
      var percent;

      percent = Math.round((exp / totalInc) * 100);

      return percent;
    };

    // storing every amount,objects etc..
    var storage = {
      item: {
        exp: [],
        inc: [],
      },
      total: {
        exp: 0,
        inc: 0,
      },
      budget: 0,
      expPercent: -1,
      expArray: [],
    };

    // calculating total inc and exp and total budget

    var calcBudget = function (type) {
      var item, sum;

      sum = 0;

      item = storage.item[type];

      if (item.length > 0) {
        item.forEach(function (cur) {
          sum += cur.value;
        });
      } else {
        sum = 0;
      }

      return sum;
    };

    // not necessary
    // // calculating serial number for each item
    // var calcSerial = function(type) {
    //   var serialNumbers = storage.item[type].map(function(cur, index) {
    //     return index + 1;
    //   });
    //   return serialNumbers;
    // };

    // returning public methods
    return {
      // creating object instances using constructor
      instances: function (type, desc, value) {
        var id, object;
        // calculating id number
        if (storage.item[type].length > 0) {
          id = storage.item[type][storage.item[type].length - 1].id + 1;
        } else {
          id = 0;
        }
        object = new Item(id, desc, value);
        storage.item[type].push(object);

        return object;
      },

      // calculating total budget
      calcBudget: function () {
        var incTotal, expTotal, itemPercent;
        // calculating inc and exp total value
        expTotal = calcBudget("exp");
        incTotal = calcBudget("inc");

        storage.total.exp = expTotal;
        storage.total.inc = incTotal;

        // calculating total budget
        storage.budget = incTotal - expTotal;

        if (incTotal >= expTotal) {
          storage.expPercent = Math.round((expTotal / incTotal) * 100);
        } else {
          storage.expPercent = -1;
        }
      },

      // calculating each item percentages and adding it in array
      calcPercent: function () {
        var expArray = storage.item.exp.map(function (cur) {
          if (storage.total.inc >= storage.total.exp) {
            return calcPercent(cur.value, storage.total.inc);
          } else {
            return -1;
          }
        });

        storage.expArray = expArray;

        return expArray;
      },

      // not necessary
      // calculating serial number
      // calcSerial: function() {
      //   return {
      //     incSerial: calcSerial("inc"),
      //     expSerial: calcSerial("exp")
      //   };
      // },

      // returning total amount as public function
      total: function () {
        return {
          totalInc: storage.total.inc,
          totalExp: storage.total.exp,
          budget: storage.budget,
          expPercent: storage.expPercent,
        };
      },

      // deleting item in array
      deleteItem: function (type, id) {
        var item;

        storage.item[type].forEach(function (cur, index) {
          if (id === cur.id) {
            item = index;
          }
        });
        storage.item[type].splice(item, 1);
      },

      // testing purposes
      testing: function () {
        return storage;
      },
    };
  })();

  //
  //
  // UI controller
  // returns public methods
  // (adds and deletes item in User Interface)
  var UIController = (function () {
    // saving class names in object for queryselectors
    var domStrings = {
      error: ".error",
      btn: ".btn",
      type: ".type",
      desc: ".desc",
      value: ".value",
      incItems: ".inc-items",
      expItems: ".exp-items",
      budget: ".budget",
      totalInc: ".total-inc",
      totalExp: ".total-exp",
      expPercent: ".total-exp-percentage",
      bottomPage: ".bottom",
      eachExpPercent: ".exp-percent",
      incSerialNum: ".inc-number",
      expSerialNum: ".exp-number",
    };

    var formatNumber = function (type, number) {
      var format, whole, fixed, comma, split, value, element;

      // changing numer as whole number to remove + and -
      whole = Math.abs(number);

      // adding decimals
      fixed = whole.toFixed(2);

      // spliting numbers into 2
      split = fixed.split(".");
      value = split[0];
      decimal = split[1];

      if (value.length > 3 && value.length <= 6) {
        comma = value.slice(0, -3) + "," + value.slice(-3);
      } else if (value.length > 6) {
        comma =
          value.slice(0, -6) +
          "," +
          value.slice(-6, -3) +
          "," +
          value.slice(-3);
      } else {
        comma = value;
      }

      if (type === "inc") {
        element = "+";
      } else if (type === "exp") {
        element = "-";
      }

      return element + " " + comma + "." + decimal;
    };

    // calculating serial number adding Serial number in inc and exp

    var addSerial = function (listType) {
      listType.forEach(function (cur, index) {
        cur.textContent = index + 1 + ".";
      });
    };

    // returning public methods
    return {
      // returning class names as public method
      domStrings: function () {
        return domStrings;
      },

      // adding new item
      addItem: function (type, obj) {
        var string, replace, element;
        if (type === "inc") {
          element = domStrings.incItems;
          string =
            '<div id="inc-%id%" class="inc-item"><p class="inc-number">1.</p><p class="inc-desc">%desc%</p><h4 class="inc-value">%value%</h4><button class="delete"><img src="./images/times-circle-regular-blue.svg" alt="delete btn" /></button></div>';
        } else if (type === "exp") {
          element = domStrings.expItems;
          string =
            '<div id="exp-%id%"class="exp-item"><p class="exp-number">1.</p><p class="exp-desc">%desc%</p><h4 class="exp-value">%value%</h4><p class="exp-percent">21%</p><button class="delete"><img src="./images/times-circle-regular-red.svg" alt="delete btn" /></button></div>';
        }

        replace = string.replace("%id%", obj.id);
        replace = replace.replace("%desc%", obj.desc);
        replace = replace.replace("%value%", formatNumber(type, obj.value));

        document
          .querySelector(element)
          .insertAdjacentHTML("beforeend", replace);
      },

      // clearing input fields
      clearInput: function () {
        var input = document.querySelectorAll(
          domStrings.desc + "," + domStrings.value
        );

        input.forEach(function (cur) {
          cur.value = "";
        });

        document.querySelector(domStrings.desc).focus();
      },

      // showing error msg
      error: function () {
        var remove = function () {
          document
            .querySelector(domStrings.error)
            .classList.remove("error-msg");
        };

        document.querySelector(domStrings.error).classList.add("error-msg");
        setTimeout(remove, 2000);
      },

      // showing calculated values
      totalAmount: function (obj) {
        obj.totalInc >= obj.totalExp ? (type = "inc") : (type = "exp");

        document.querySelector(domStrings.budget).textContent = formatNumber(
          type,
          obj.budget
        );
        document.querySelector(domStrings.totalInc).textContent = formatNumber(
          "inc",
          obj.totalInc
        );
        document.querySelector(domStrings.totalExp).textContent = formatNumber(
          "exp",
          obj.totalExp
        );

        if (obj.expPercent >= 0) {
          document.querySelector(domStrings.expPercent).textContent =
            obj.expPercent + "%";
        } else {
          document.querySelector(domStrings.expPercent).textContent = "---";
        }
      },

      // deleting items in UI

      deleteItem: function (type, id) {
        var element, child, itemId;

        if (type === "exp") {
          element = domStrings.expItems;
        } else if (type === "inc") {
          element = domStrings.incItems;
        }

        var child = document.querySelector(element).childNodes;

        child.forEach(function (cur) {
          itemId = cur.id;

          if (id === itemId) {
            cur.parentNode.removeChild(cur);
          }
        });
      },

      // showing each exp percentages in UI
      addPercent: function (expArray) {
        var percent = document.querySelectorAll(domStrings.eachExpPercent);
        percent.forEach(function (cur, index) {
          if (expArray[index] > 0) {
            cur.textContent = expArray[index] + "%";
          } else {
            cur.textContent = "---";
          }
        });
      },

      // adding serial number to UI
      addSerial: function () {
        var incSerial, expSerial;

        incSerial = document.querySelectorAll(domStrings.incSerialNum);
        expSerial = document.querySelectorAll(domStrings.expSerialNum);

        addSerial(incSerial);
        addSerial(expSerial);
      },

      // changing input border when type changes
      changeBorder: function () {
        var input;

        input = document.querySelectorAll(
          domStrings.type + ", " + domStrings.desc + ", " + domStrings.value
        );
        input.forEach(function (cur) {
          cur.classList.toggle("red-border");
        });
        document.querySelector(domStrings.btn).classList.toggle("red");
      },

      // creating and returning input values
      inputValues: function () {
        // changing first letter to capital letter
        var desc = document.querySelector(domStrings.desc).value;
        var capitalized = desc.charAt(0).toUpperCase() + desc.slice(1);

        return {
          type: document.querySelector(domStrings.type).value, // either inc or exp
          desc: capitalized,
          value: parseFloat(document.querySelector(domStrings.value).value),
        };
      },
    };
  })();

  //
  //
  // main controller
  // returns public methods
  // (getting and controlling methods from other modules(ie. iife(imediately invoked function expression)))
  // and command event listeners

  var controller = (function (budgetCtrl, UICtrl) {
    // function for all event listeners
    var event = function () {
      // getting and storing class names from UI
      var domStrings = UICtrl.domStrings();

      // click event
      document.querySelector(domStrings.btn).addEventListener("click", app);

      // enter button event
      document.addEventListener("keydown", function (e) {
        // enter button in keyboards keyCode is 13
        if (e.keyCode === 13) {
          if (
            document.activeElement === document.querySelector(domStrings.desc)
          ) {
            document.querySelector(domStrings.value).focus();
          } else {
            app();
          }
        }
      });

      // event listeners it delete items
      document
        .querySelector(domStrings.bottomPage)
        .addEventListener("click", deleteItem);

      // changing input border when type changes
      document
        .querySelector(domStrings.type)
        .addEventListener("change", UICtrl.changeBorder);
    };

    // creating app function for event listener
    var app = function app() {
      // getting and storing input values
      var inputValues = UICtrl.inputValues();

      // checking if value is an number

      if (inputValues.value && inputValues.desc) {
        // using budget controller public method to create and store objects with inputValues
        var object = budgetCtrl.instances(
          inputValues.type,
          inputValues.desc,
          inputValues.value
        );

        // adding items to UI
        UICtrl.addItem(inputValues.type, object);

        // clearing input fields
        UICtrl.clearInput();

        // calculating buget values
        calcBudget();
      } else {
        // showing error msg
        UICtrl.error();
      }
    };

    // calculating total amount
    var calcBudget = function () {
      // calculating total budget
      budgetCtrl.calcBudget();

      // storing total values
      var total = budgetCtrl.total();

      // adding total in UI
      UICtrl.totalAmount(total);

      // calculating percentages
      var percentArray = budgetCtrl.calcPercent();

      // showing each percent array in UI
      UICtrl.addPercent(percentArray);

      // not necessary
      // // calculating serial number and storing it
      // var serialNumber = budgetCtrl.calcSerial();

      // adding serial number in UI
      UICtrl.addSerial();
    };

    // deleting items
    var deleteItem = function (event) {
      var btn, split, type, id;

      btn = event.target.parentNode.parentNode.id;

      if (btn) {
        split = btn.split("-");
        type = split[0];
        id = parseInt(split[1]);

        // deleting item in storage
        budgetCtrl.deleteItem(type, id);

        //deleting item in UI
        UICtrl.deleteItem(type, btn);

        // calculating total amount
        calcBudget();
      }
    };

    // returning public methods
    return {
      // returning event listeners function as public method
      init: function () {
        console.log("application has started");
        event();
        UICtrl.totalAmount({
          totalInc: 0,
          totalExp: 0,
          budget: 0,
          expPercent: 0,
        });
        document.querySelector(".desc").focus();
        document.querySelector(".type").value = "inc";
      },
    };
  })(budgetController, UIController);
  // calling init function
  controller.init();

  return {
    data: function () {
      return budgetController.testing();
    },
  };
})();

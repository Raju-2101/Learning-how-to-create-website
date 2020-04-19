var budgetController = (function() {
  var Expense = function(id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
    this.percent = -1;
  };

  Expense.prototype.calcPercent = function(totalInc) {
    if (totalInc > 0) {
      this.percent = Math.round((this.value / totalInc) * 100);
    } else {
      this.percent = -1;
    }
  };

  var Income = function(id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };

  // calculating total

  var calcTotal = function(type) {
    var sum = 0;
    data.items[type].forEach(function(cur) {
      sum += cur.value;
    });

    data.total[type] = sum;
  };

  // storing all new items and calculations
  var data = {
    items: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    },
    budgetTotal: 0,
    percent: 0
  };

  return {
    newItem: function(type, desc, value) {
      var addItem, id;

      // calculating id
      if (data.items[type].length > 0) {
        id = data.items[type][data.items[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // creating new object base on type
      if (type === "exp") {
        addItem = new Expense(id, desc, value);
      } else if (type === "inc") {
        addItem = new Income(id, desc, value);
      }

      // saving new item in an array
      data.items[type].push(addItem);

      return addItem;
    },

    calcBudget: function() {
      // total inc and exp
      calcTotal("exp");
      calcTotal("inc");

      // total budget
      data.budgetTotal = data.total.inc - data.total.exp;

      // calculating percent

      if (data.total.inc > 0) {
        data.percent = Math.round((data.total.exp / data.total.inc) * 100);
      } else {
        data.percent = -1;
      }
    },

    total: function() {
      return {
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        budget: data.budgetTotal,
        percent: data.percent
      };
    },

    // calculating income percent
    calcPercent: function() {
      // calculating percentage
      data.items.exp.forEach(function(cur) {
        cur.calcPercent(data.total.inc);
      });
    },

    getPercent: function() {
      var percentages = data.items.exp.map(function(cur) {
        return cur.percent;
      });
      return percentages;
    },

    deleteItem: function(type, id) {
      var ids, index;

      ids = data.items[type].map(function(cur) {
        return cur.id;
      });
      index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },

    testing: function() {
      console.log(data);
    }
  };
})();

var UIController = (function() {
  var domStrings = {
    type: ".add__type",
    desc: ".add__description",
    value: ".add__value",
    btn: ".add__btn",
    income: ".income__list",
    expense: ".expenses__list",
    budget: ".budget__value",
    totalInc: ".budget__income--value",
    totalExp: ".budget__expenses--value",
    expPercent: ".budget__expenses--percentage",
    container: ".container",
    expItemPercent: ".item__percentage",
    month: ".budget__title--month"
  };

  var formatNumber = function(int, type) {
    var split, num, dec;

    int = Math.abs(int);
    int = int.toFixed(2);

    split = int.split(".");

    num = split[0];
    dec = split[1];

    if (num.length > 3 && num.length <= 6) {
      num = num.slice(0, -3) + "," + num.slice(-3);
      console.log(num);
    } else if (num.length > 6) {
      num = num.slice(0, -6) + "," + num.slice(-6, -3) + "," + num.slice(-3);
    }

    return (type === "exp" ? "-" : "+") + " " + num + "." + dec;
  };

  return {
    domStrings: function() {
      return domStrings;
    },

    input: function() {
      var desc = document.querySelector(domStrings.desc).value;

      return {
        // getting input values
        type: document.querySelector(domStrings.type).value,
        desc: desc.charAt(0).toUpperCase() + desc.slice(1),
        value: parseFloat(document.querySelector(domStrings.value).value)
      };
    },

    addInput: function(obj, type) {
      var html, element, newHtml;

      if (type === "exp") {
        element = domStrings.expense;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "inc") {
        element = domStrings.income;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%desc%", obj.desc);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clear: function() {
      var fields;

      fields = document.querySelectorAll(
        domStrings.desc + "," + domStrings.value
      );

      fields.forEach(function(item) {
        item.value = "";
      });

      fields[0].focus();
    },

    updateAmount: function(obj) {
      type = obj.budget > 0 ? "inc" : "exp";

      document.querySelector(domStrings.budget).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(domStrings.totalInc).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );
      document.querySelector(domStrings.totalExp).textContent = formatNumber(
        obj.totalExp,
        "exp"
      );

      if (obj.percent !== -1) {
        document.querySelector(domStrings.expPercent).textContent =
          obj.percent + "%";
      } else {
        document.querySelector(domStrings.expPercent).textContent = "---";
      }
    },

    updatePercent: function(percent) {
      document
        .querySelectorAll(domStrings.expItemPercent)
        .forEach(function(cur, index) {
          if (percent[index] > 0) {
            cur.textContent = percent[index];
          } else {
            cur.textContent = "---";
          }
        });
    },

    deleteUI: function(selectorId) {
      el = document.getElementById(selectorId);
      el.parentNode.removeChild(el);
    },

    setYear: function() {
      var month, year, date, months;

      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

      date = new Date();

      month = date.getMonth();

      year = date.getFullYear();

      document.querySelector(domStrings.month).textContent =
        months[month] + ", " + year;
    },

    focusInput: function() {
      input = document.querySelectorAll(
        domStrings.type + "," + domStrings.desc + "," + domStrings.value
      );

      input.forEach(function(cur) {
        cur.classList.toggle("red-focus");
      });

      document.querySelector(domStrings.btn).classList.toggle("red");
    }
  };
})();

// app controller
var controller = (function(budgetCtrl, UICtrl) {
  var updateBudget = function() {
    // update values
    budgetCtrl.calcBudget();

    // return values
    var total = budgetCtrl.total();

    // updating in UI
    UICtrl.updateAmount(total);
  };

  var updatePercent = function() {
    // calculating percentage
    budgetCtrl.calcPercent();

    // getting percentage
    var percentages = budgetCtrl.getPercent();

    // updating in ui
    UICtrl.updatePercent(percentages);
  };

  var addItem = function() {
    var input, newItem;

    // getting input values
    input = UICtrl.input();

    if (input.desc && input.value && input.value > 0) {
      // creating and saving new items with input values
      newItem = budgetCtrl.newItem(input.type, input.desc, input.value);

      // adding input values to UI
      UICtrl.addInput(newItem, input.type);

      // clearing  input values
      UICtrl.clear();

      // calculating and updating the buget
      updateBudget();

      // updating and adding total percentage in expenses
      updatePercent();
    }
  };

  var setupEventListeners = function() {
    var domStrings = UICtrl.domStrings();

    // adding event listeners
    document.querySelector(domStrings.btn).addEventListener("click", addItem);

    document.addEventListener("keydown", function(e) {
      if (e.keyCode === 13 || e.witch === 13) {
        if (
          document.activeElement === document.querySelector(domStrings.desc)
        ) {
          document.querySelector(domStrings.value).focus();
        } else {
          addItem();
        }
      }
    });

    document
      .querySelector(domStrings.container)
      .addEventListener("click", deleteItem);

    document
      .querySelector(domStrings.type)
      .addEventListener("change", UICtrl.focusInput);
  };

  var deleteItem = function(event) {
    var string, split, type, id;

    string = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (string) {
      split = string.split("-");
      type = split[0];
      id = parseInt(split[1]);

      // delete item in budget
      budgetCtrl.deleteItem(type, id);

      // delete item in UI
      UICtrl.deleteUI(string);

      //updating total budget
      updateBudget();

      // updating and adding total percentage in expenses
      updatePercent();
    }
  };

  return {
    init: function() {
      setupEventListeners();
      UICtrl.updateAmount({
        totalInc: 0,
        totalExp: 0,
        budget: 0,
        percent: 0
      });
      UICtrl.setYear();
    }
  };
})(budgetController, UIController);

// calling event function
controller.init();

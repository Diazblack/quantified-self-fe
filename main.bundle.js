/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";

	function getFoods() {
	  var _this = this;

	  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/foods";
	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (json_response) {
	    return _this.showFoods(json_response);
	  });
	}

	function postFood() {
	  var _this2 = this;

	  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/foods";
	  var payload = {
	    "food": {
	      "name": document.getElementById('foodName').value,
	      "calories": document.getElementById('foodCalorie').value
	    }
	  };

	  fetch(url, {
	    method: 'POST',
	    headers: { 'Accept': 'application/json',
	      'Content-Type': 'application/json' },
	    body: JSON.stringify(payload)
	  }).then(function (response) {
	    return response.json();
	  }).catch(function (error) {
	    return console.error(error);
	  }).then(function (json_response) {
	    return _this2.ammendFoods(json_response);
	  });
	}

	function editFood(id) {
	  var food_id = id;
	  var name_value = document.getElementById(food_id + "-name").innerHTML;
	  var food_name_input = "<input id='edit-name' value=" + name_value + ">";
	  var calories_value = document.getElementById(food_id + "-calories").innerHTML;
	  var food_calories_input = "<input id='edit-calories' value=" + calories_value + ">";

	  document.getElementById(food_id + "-edit").style.display = "none";
	  document.getElementById(food_id + "-save").style.display = "inline-block";
	  document.getElementById(food_id + "-name").innerHTML = food_name_input;
	  document.getElementById(food_id + "-calories").innerHTML = food_calories_input;
	}

	function saveFood(id) {
	  var _this3 = this;

	  var food_id = id;

	  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/foods/" + food_id;
	  var payload = {
	    "food": {
	      "name": document.getElementById("edit-name").value,
	      "calories": document.getElementById("edit-calories").value
	    }
	  };

	  fetch(url, {
	    method: 'PATCH',
	    headers: { 'Accept': 'application/json',
	      'Content-Type': 'application/json' },
	    body: JSON.stringify(payload)
	  }).then(function (response) {
	    return response.json();
	  }).catch(function (error) {
	    return console.error(error);
	  }).then(function (json_response) {
	    return _this3.patchFoods(json_response);
	  });
	}

	function removeFood(id) {
	  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/foods/" + id;
	  fetch(url, {
	    method: 'DELETE',
	    headers: { 'Accept': 'application/json',
	      'Content-Type': 'application/json' }
	  }).then(function (response) {
	    return response.json();
	  }).catch(function (error) {
	    return console.error(error);
	  });
	  getfoods();
	}

	function patchFoods(json_response) {
	  var food_id = json_response['id'];
	  var updated_name = json_response['name'];
	  var updated_calories = json_response['calories'];

	  document.getElementById(food_id + "-edit").style.display = "inline-block";
	  document.getElementById(food_id + "-save").style.display = "none";

	  document.getElementById(food_id + "-name").innerHTML = updated_name;
	  document.getElementById(food_id + "-calories").innerHTML = updated_calories;
	}

	function showFoods(json_response) {
	  var foodArray = json_response;
	  var table = document.getElementById("foodsTable").getElementsByTagName('tbody')[0];

	  foodArray.forEach(function (food) {
	    var name = food['name'];
	    var calories = food['calories'];
	    var food_id = food['id'];
	    edit_food = "<button class='button' id=\"" + food_id + "-edit\" onclick=\"editFood(" + food_id + ")\">Edit</button>";
	    save_food = "<button class='button' id=\"" + food_id + "-save\" onclick=\"saveFood(" + food_id + ")\" style=\"display: none;\">Save</button>";
	    delete_food = "<button class='delete-btn' id='" + food_id + "-del' onclick=\"removeFood(" + food_id + ")\">-</button>";
	    var row = table.insertRow(0);
	    var cell1 = row.insertCell(0);
	    var cell2 = row.insertCell(1);
	    var cell3 = row.insertCell(2);
	    var cell4 = row.insertCell(3);

	    row.id = name;
	    cell1.innerHTML = "<h4 id=\"" + food_id + "-name\">" + name + "</h4>";
	    cell2.innerHTML = "<h4 id=\"" + food_id + "-calories\">" + calories + "</h4>";
	    cell3.innerHTML = edit_food + save_food;
	    cell4.innerHTML = delete_food;
	  });
	}

	function ammendFoods(json_response) {
	  var food = json_response;
	  var table = document.getElementById("foodsTable").getElementsByTagName('tbody')[0];

	  var name = food['name'];
	  var calories = food['calories'];
	  var food_id = food['id'];
	  edit_food = "<button class='button' id='edit-" + food_id + "' onclick=\"editFood()\">Edit</button>";
	  delete_food = "<button class='delete-btn' id='del-" + food_id + "' onclick=\"removeFood()\">-</button>";
	  var row = table.insertRow(0);
	  var cell1 = row.insertCell(0);
	  var cell2 = row.insertCell(1);
	  var cell3 = row.insertCell(2);
	  var cell4 = row.insertCell(3);

	  row.id = name;
	  cell1.innerHTML = name;
	  cell2.innerHTML = calories;
	  cell3.innerHTML = edit_food;
	  cell4.innerHTML = delete_food;
	}

	function filterFoods() {
	  var food = document.getElementById("filter").value;

	  var foodTable = document.getElementById("foodsTable");
	  for (var i = 0, row; row = foodTable.rows[i]; i++) {
	    row.style.display = 'none';
	  }
	  foodTable.rows[0].style.display = 'table-row';
	  document.getElementById("" + food).style.display = 'table-row';
	}

	function displayAllFoods() {
	  var foodTable = document.getElementById("foodsTable");
	  for (var i = 0, row; row = foodTable.rows[i]; i++) {
	    row.style.display = 'table-row';
	  }
	}

	$(document).on("load", getFoods());

/***/ })
/******/ ]);
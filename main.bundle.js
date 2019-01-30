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
	    _this.showFoods(json_response);
	  });
	}

	function showFoods(json_response) {
	  debugger;
	  var foodArray = json_response;
	  var table = document.getElementById("foodsTable").getElementsByTagName('tbody')[0];

	  foodArray.forEach(function (food) {
	    var name = food['name'];
	    var calories = food['calories'];
	    var food_id = food['id'];
	    food_id = "<button class='button' id='" + food_id + "' onclick=\"removeFood()\">-</button>";
	    var row = table.insertRow(0);
	    var cell1 = row.insertCell(0);
	    var cell2 = row.insertCell(1);
	    var cell3 = row.insertCell(2);

	    cell1.innerHTML = name;
	    cell2.innerHTML = calories;
	    cell3.innerHTML = food_id;
	  });
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

	$(window).load(getFoods());


/***/ })
/******/ ]);

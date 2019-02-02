function getFoods(){
  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/foods";
  fetch(url).then(response => response.json()).then(json_response => {this.showFoods(json_response)});
}

function getAllMeals(){
  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/meals";
  fetch(url).then(response => response.json()).then(json_response => {this.showMeals(json_response)});
}

function createNewFood(){
  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/foods";
  var payload = {
    "food": {
      "name": document.getElementById('foodName').value,
      "calories": document.getElementById('foodCalorie').value,
      }
    };

  fetch(url, {
    method: 'POST',
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(json_response => this.ammendFoods(json_response));
}

function ammendFoods(json_response){
  var food = json_response;
  var table = document.getElementById("foodTable").getElementsByTagName('tbody')[0];

  var name = food['name'];
  var calories = food['calories'];
  var food_id = food['id']
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  row.id = name;
  cell1.innerHTML = `<input type="radio" name="radio" value="${food_id}">`;
  cell2.innerHTML = `<h4 id="${food_id}-name">${name}</h4>`;
  cell3.innerHTML = `<h4 id="${food_id}-calories">${calories}</h4>`;
}

function showMeals(json_response){
  let breakfast_info = json_response[0];
  let snack_info = json_response[1];
  let lunch_info = json_response[2];
  let dinner_info = json_response[3];

  displayMeal(breakfast_info, "breakfast");
  displayMeal(snack_info, "snack");
  displayMeal(lunch_info, "lunch");
  displayMeal(dinner_info, "dinner");
}

function displayMeal(food_info, meal_name){
  let food_array = food_info['foods'];
  var food_table = document.getElementById(`${meal_name}Table`).getElementsByTagName('tbody')[0];
  while (food_table.firstChild) food_table.removeChild(food_table.firstChild);

  food_array.forEach(food => {
    var name = food['name'];
    var calories = food['calories'];
    var food_id = food['id']
    delete_food = `<button class='delete-btn' id='${food_id}-del' onclick="removeFood()">-</button>`
    var row = food_table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    row.id = name;
    cell1.innerHTML = `<h4 id="${food_id}-name">${name}</h4>`;
    cell2.innerHTML = `<h4 id="${food_id}-calories">${calories}</h4>`;
    cell3.innerHTML = delete_food;
  })
}

function showFoods(json_response){
  var foodArray = json_response;
  var table = document.getElementById("foodTable").getElementsByTagName('tbody')[0];

  foodArray.forEach(food => {
    var name = food['name'];
    var calories = food['calories'];
    var food_id = food['id']
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    row.id = name;
    cell1.innerHTML = `<input type="radio" name="radio" value="${food_id}">`;
    cell2.innerHTML = `<h4 id="${food_id}-name">${name}</h4>`;
    cell3.innerHTML = `<h4 id="${food_id}-calories">${calories}</h4>`;
  })
}

function postToMeal(food_id, meal_id){
  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/meals/" + meal_id + "/foods/" + food_id;
  fetch(url, {
    method: 'POST',
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(json_response => this.displayUpdatedMeal(json_response, meal_id))
}

function getUpdatedMeal(meal_id){
  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/meals/" + meal_id + "/foods";
  if (meal_id == "1"){
    var meal_name = "breakfast"
  } else if (meal_id == "2"){
    var meal_name = "snack"
  } else if (meal_id == "3"){
    var meal_name = "lunch"
  } else if (meal_id == "4"){
    var meal_name = "dinner"
  }

  fetch(url).then(response => response.json()).then(json_response => {this.displayMeal(json_response, meal_name)});
}

function filterFoods(){
  var food = document.getElementById("filter").value;

  var foodTable = document.getElementById("foodTable")
  for (var i = 0, row; row = foodTable.rows[i]; i++) {
    row.style.display = 'none';
  }
  foodTable.rows[0].style.display = 'table-row';
  document.getElementById(`${food}`).style.display = 'table-row';
}

function displayAllFoods(){
  var foodTable = document.getElementById("foodTable")
  for (var i = 0, row; row = foodTable.rows[i]; i++) {
    row.style.display = 'table-row';
  }
}


function displayUpdatedMeal(response, meal_id){
  var message = response["message"];
  document.getElementById("message-text").innerHTML= message
  getUpdatedMeal(meal_id);
}

$( document ).on( "load", getAllMeals());
$( document ).on( "load", getFoods());

$(document).ready(function(){
  $("input[id='breakfast-btn']").click(function(){
    var foodToAdd = $("input[name='radio']:checked").val();
    postToMeal(foodToAdd, "1");
  })
})

$(document).ready(function(){
  $("input[id='snack-btn']").click(function(){
    var foodToAdd = $("input[name='radio']:checked").val();
    postToMeal(foodToAdd, "2");
  })
})

$(document).ready(function(){
  $("input[id='lunch-btn']").click(function(){
    var foodToAdd = $("input[name='radio']:checked").val();
    postToMeal(foodToAdd, "3");
  })
})

$(document).ready(function(){
  $("input[id='dinner-btn']").click(function(){
    var foodToAdd = $("input[name='radio']:checked").val();
    postToMeal(foodToAdd, "4");
  })
})

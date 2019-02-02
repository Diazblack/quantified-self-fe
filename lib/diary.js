function getFoods(){
  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/foods";
  fetch(url).then(response => response.json()).then(json_response => {this.showFoods(json_response)});
}

function getAllMeals(){
  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/meals";
  fetch(url).then(response => response.json()).then(json_response => {this.showMeals(json_response)});
}

function getBreakfast(){
  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/meals/1";
  fetch(url).then(response => response.json()).then(json_response => {this.displayMeal(json_response, "breakfast")});

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

function postToBreakfast(food_id){
  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/meals/1/foods/" + food_id;
  fetch(url, {
    method: 'POST',
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(json_response => this.displayUpdatedMeal(json_response))
}

function displayUpdatedMeal(response){
  var message = response["message"];
  document.getElementById("message-text").innerHTML= message
  getAllMeals();
}

$( document ).on( "load", getAllMeals());
$( document ).on( "load", getFoods());

$(document).ready(function(){
  $("input[id='breakfast-btn']").click(function(){
    var foodToAdd = $("input[name='radio']:checked").val();
    postToBreakfast(foodToAdd);
  })
})

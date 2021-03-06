function getFoods(){
  var url = "https://quantified-self-533.herokuapp.com/api/v1/foods";
  fetch(url).then(response => response.json()).then(json_response => {this.showFoods(json_response)});
}

function getAllMeals(){
  var url = "https://quantified-self-533.herokuapp.com/api/v1/meals";
  fetch(url).then(response => response.json()).then(json_response => {this.showMeals(json_response)});
}

function removeFood(meal_id, food_id){
  var url = "https://quantified-self-533.herokuapp.com/api/v1/meals/" + meal_id + "/foods/" + food_id;
  fetch(url,{
    method: 'DELETE',
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
  })
  .then(response => this.getAllMeals())
  .catch(error => console.error(error))
}

function createNewFood(){
  var url = "https://quantified-self-533.herokuapp.com/api/v1/foods";
  var payload = {
      "name": document.getElementById('foodName').value,
      "calories": document.getElementById('foodCalorie').value,
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

function grabMeals(){
  url = "https://quantified-self-533.herokuapp.com/api/v1/meals"
  fetch(url).then(response => response.json()).then(json_response => this.saveToCalendar(json_response))
}

function saveToCalendar(meals_info){
  var meals = meals_info
  var goal_calories = document.getElementById('goal-total').textContent
  var consumed_calories = document.getElementById('consumed-total').textContent
  var remaining_calories = document.getElementById('remaining-total').textContent
  var date = document.getElementById("date").value
  var payload = {
        "date_str": date,
        "goal": goal_calories,
        "consumed": consumed_calories,
        "remaining": remaining_calories,
        "meals": meals
    };

  var url = "https://quantified-self-533.herokuapp.com/api/v1/calendar"
    fetch(url, {
      method: 'POST',
      headers: { 'Accept': 'application/json',
        'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
      })
      .catch(error => console.error(error))
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

  calculateTotals("goal");
  calculateTotals("consumed");
  calculateTotals("remaining");
}

function calculateTotals(name){
  var breakfast = document.getElementById(`${name}-breakfast`).textContent
  var snack = document.getElementById(`${name}-snack`).textContent
  var lunch = document.getElementById(`${name}-lunch`).textContent
  var dinner = document.getElementById(`${name}-dinner`).textContent
  var sum = parseInt(breakfast) + parseInt(snack) + parseInt(lunch) + parseInt(dinner)

  document.getElementById(`${name}-total`).innerHTML = `<h2>${sum}</h2>`
}

function displayMeal(food_info, meal_name){
  if (meal_name == "breakfast"){
    var meal_id = 1
  } else if (meal_name == "snack"){
    var meal_id = 2
  } else if (meal_name == "lunch"){
    var meal_id = 3
  } else if (meal_name == "dinner"){
    var meal_id = 4
  }
  let food_array = food_info['foods'];
  var food_table = document.getElementById(`${meal_name}Table`).getElementsByTagName('tbody')[0];
  while (food_table.firstChild) food_table.removeChild(food_table.firstChild);

  food_array.forEach(food => {
    var name = food['name'];
    var calories = food['calories'];
    var food_id = food['id']
    delete_food = `<button class='delete-btn' id='${food_id}-del' onclick="removeFood(${meal_id}, ${food_id})">-</button>`
    var row = food_table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    row.id = name;
    cell1.innerHTML = `<h4 id="${food_id}-name">${name}</h4>`;
    cell2.innerHTML = `<h4 id="${food_id}-calories">${calories}</h4>`;
    cell3.innerHTML = delete_food;
  })
  calculateCalories(meal_name);
}

function calculateCalories(meal_name){
  var table = document.getElementById(`${meal_name}Table`).getElementsByTagName('tbody')[0]
  var sumVal = 0;
  for(var i = 0; i < table.rows.length; i++){
    sumVal = sumVal + parseInt(table.rows[i].cells[1].textContent);
  }
  document.getElementById(`consumed-${meal_name}`).innerHTML = `<h3>${sumVal}</h3>`;
  var consumed = document.getElementById(`consumed-${meal_name}`).textContent
  var goal = document.getElementById(`goal-${meal_name}`).textContent
  var remaining = goal - consumed
  document.getElementById(`remaining-${meal_name}`).innerHTML =`<h3>${remaining}</h3>`
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
  var url = "https://quantified-self-533.herokuapp.com/api/v1/meals/" + meal_id + "/foods/" + food_id;
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
  var url = "https://quantified-self-533.herokuapp.com/api/v1/meals/" + meal_id + "/foods";
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

function editGoal(meal_name){
  let meal_to_edit = document.getElementById(`goal-${meal_name}`).textContent;
  let goal_input = `<input id='edit-${meal_name}-goal' value=${meal_to_edit}>`

  document.getElementById(`${meal_name}-goal-edit`).style.display = "none";
  document.getElementById(`${meal_name}-goal-save`).style.display = "inline-block";
  document.getElementById(`goal-${meal_name}`).innerHTML = goal_input;
}

function saveGoal(meal_name){
  let goal_to_save = document.getElementById(`edit-${meal_name}-goal`).value;
  let new_goal = `<h3>${goal_to_save}</h3>`

  document.getElementById(`${meal_name}-goal-edit`).style.display = "inline-block";
  document.getElementById(`${meal_name}-goal-save`).style.display = "none";
  document.getElementById(`goal-${meal_name}`).innerHTML = new_goal
  calculateCalories(meal_name)
  calculateTotals("goal");
  calculateTotals("remaining");
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

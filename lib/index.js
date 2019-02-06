function getFoods(){
  var url = "https://quantified-self-533.herokuapp.com/api/v1/foods";
  fetch(url).then(response => response.json()).then(json_response => {this.showFoods(json_response)});
}

function postFood(){
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

function saveFood(id){
  let food_id = id;

  var url = "https://quantified-self-533.herokuapp.com/api/v1/foods/" + food_id;
  var payload = {
      "name": document.getElementById(`edit-name`).value,
      "calories": document.getElementById(`edit-calories`).value,
  };

  fetch(url, {
    method: 'PATCH',
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(json_response => this.patchFoods(json_response));
}

function removeFood(id){
  var url = "https://quantified-self-533.herokuapp.com/api/v1/foods/" + id;
  fetch(url,{
    method: 'DELETE',
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
  })
  .then(response => this.getFoods())
  .catch(error => console.error(error))
}

function editFood(id){
  let food_id = id;
  let name_value = document.getElementById(`${food_id}-name`).innerHTML;
  let food_name_input = `<input id='edit-name' value=${name_value}>`;
  let calories_value = document.getElementById(`${food_id}-calories`).innerHTML;
  let food_calories_input = `<input id='edit-calories' value=${calories_value}>`;

  document.getElementById(`${food_id}-edit`).style.display = "none";
  document.getElementById(`${food_id}-save`).style.display = "inline-block";
  document.getElementById(`${food_id}-name`).innerHTML = food_name_input;
  document.getElementById(`${food_id}-calories`).innerHTML = food_calories_input;
}

function patchFoods(json_response){
  let food_id = json_response[0]['id']
  let updated_name = json_response[0]['name']
  let updated_calories = json_response[0]['calories']

  document.getElementById(`${food_id}-edit`).style.display = "inline-block";
  document.getElementById(`${food_id}-save`).style.display = "none";

  document.getElementById(`${food_id}-name`).innerHTML = updated_name;
  document.getElementById(`${food_id}-calories`).innerHTML = updated_calories;
}

function showFoods(json_response){
  var foodArray = json_response;
  var table = document.getElementById("foodsTable").getElementsByTagName('tbody')[0];
  while (table.firstChild) table.removeChild(table.firstChild);

  foodArray.forEach(food => {
    var name = food['name'];
    var calories = food['calories'];
    var food_id = food['id']
    edit_food = `<button class='button' id="${food_id}-edit" onclick="editFood(${food_id})">Edit</button>`
    save_food = `<button class='button' id="${food_id}-save" onclick="saveFood(${food_id})" style="display: none;">Save</button>`
    delete_food = `<button class='delete-btn' id='${food_id}-del' onclick="removeFood(${food_id})">-</button>`
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    row.id = name;
    cell1.innerHTML = `<h4 id="${food_id}-name">${name}</h4>`;
    cell2.innerHTML = `<h4 id="${food_id}-calories">${calories}</h4>`;
    cell3.innerHTML = edit_food + save_food;
    cell4.innerHTML = delete_food;
  })
}

function ammendFoods(json_response){
  var food = json_response;
  var table = document.getElementById("foodsTable").getElementsByTagName('tbody')[0];

  var name = food['name'];
  var calories = food['calories'];
  var food_id = food['id']
  edit_food = `<button class='button' id='edit-${food_id}' onclick="editFood()">Edit</button>`
  save_food = `<button class='button' id="${food_id}-save" onclick="saveFood(${food_id})" style="display: none;">Save</button>`
  delete_food = `<button class='delete-btn' id='del-${food_id}' onclick="removeFood(${food_id})">-</button>`
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  row.id = name;
  cell1.innerHTML = `<h4 id="${food_id}-name">${name}</h4>`;
  cell2.innerHTML = `<h4 id="${food_id}-calories">${calories}</h4>`;
  cell3.innerHTML = edit_food + save_food;
  cell4.innerHTML = delete_food;
}

function filterFoods(){
  var food = document.getElementById("filter").value;

  var foodTable = document.getElementById("foodsTable")
  for (var i = 0, row; row = foodTable.rows[i]; i++) {
    row.style.display = 'none';
  }
  foodTable.rows[0].style.display = 'table-row';
  document.getElementById(`${food}`).style.display = 'table-row';
}

function displayAllFoods(){
  var foodTable = document.getElementById("foodsTable")
  for (var i = 0, row; row = foodTable.rows[i]; i++) {
    row.style.display = 'table-row';
  }
}

$( document ).on("load", getFoods());

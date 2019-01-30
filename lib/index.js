function getFoods(){
  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/foods";
  fetch(url).then(response => response.json()).then(json_response => {this.showFoods(json_response)});
}

function postFood(){
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

function showFoods(json_response){
  var foodArray = json_response;
  var table = document.getElementById("foodsTable").getElementsByTagName('tbody')[0];

  foodArray.forEach(food => {
    var name = food['name'];
    var calories = food['calories'];
    var food_id = food['id']
    food_id = `<button class='delete-btn' id='${food_id}' onclick="removeFood()">-</button>`
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    row.id = name;
    cell1.innerHTML = name;
    cell2.innerHTML = calories;
    cell3.innerHTML = food_id;
  })
}

function ammendFoods(json_response){
  var food = json_response;
  var table = document.getElementById("foodsTable").getElementsByTagName('tbody')[0];

  var name = food['name'];
  var calories = food['calories'];
  var food_id = food['id']
  food_id = `<button class='delete-btn' id='${food_id}' onclick="removeFood()">-</button>`
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  row.id = name;
  cell1.innerHTML = name;
  cell2.innerHTML = calories;
  cell3.innerHTML = food_id;
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

$( window ).load(getFoods());

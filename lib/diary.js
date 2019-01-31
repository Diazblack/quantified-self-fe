function getAllMeals(){
  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/meals";
  fetch(url).then(response => response.json()).then(json_response => {this.showMeals(json_response)});
}

function showMeals(json_response){
  let breakfast_info = json_response[0];
  let snack_info = json_response[1];
  let lunch_info = json_response[2];
  let dinner_info = json_response[3];

  displayBreakfast(breakfast_info);
}

function displayBreakfast(breakfast_info){
  debugger;
  let breakfast_array = breakfast_info['foods'];
  var breakfast_table = document.getElementById("breakfastTable").getElementsByTagName('tbody')[0];


  breakfast_array.forEach(food => {
    var name = food['name'];
    var calories = food['calories'];
    var food_id = food['id']
    delete_food = `<button class='delete-btn' id='${food_id}-del' onclick="removeFood()">-</button>`
    var row = breakfast_table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    row.id = name;
    cell1.innerHTML = `<h4 id="${food_id}-name">${name}</h4>`;
    cell2.innerHTML = `<h4 id="${food_id}-calories">${calories}</h4>`;
    cell3.innerHTML = delete_food;
  })
}

$( document ).on( "load", getAllMeals());

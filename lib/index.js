const getFoods = () => {
  var url = "https://fast-meadow-36413.herokuapp.com/api/v1/foods";
  fetch(url).then(response => response.json()).then(json_response => {this.showFoods(json_response)});
}

function showFoods(json_response){
  var foodArray = json_response;
  var table = document.getElementById("foodsTable");

  foodArray.forEach(food => {
    var name = food['name'];
    var calories = food['calories'];
    var food_id = food['id']
    food_id = `<button class='button' id='${food_id}' onclick="removeFood()">-</button>`
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = name;
    cell2.innerHTML = calories;
    cell3.innerHTML = food_id;
  })
}

window.onload = getFoods

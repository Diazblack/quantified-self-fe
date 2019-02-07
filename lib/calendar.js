function getCalendar(){
  var url = "https://quantified-self-533.herokuapp.com/api/v1/calendar";
  fetch(url).then(response => response.json()).then(json_response => this.showCalendar(json_response));
}

function showCalendar(json_response){

  var calendar_data_array = json_response;

  var table = document.getElementById("calendarTable").getElementsByTagName('tbody')[0];
  while (table.firstChild) table.removeChild(table.firstChild);

  calendar_data_array.forEach(calendar_date => {
    var entry_date = calendar_date["date_str"]
    var entry_goal = calendar_date["goal"]
    var entry_consumed = calendar_date["consumed"]
    var entry_remaining = calendar_date["remaining"]
    var breakfast_data = []
    calendar_date["meals"][0]["foods"].forEach(breakfast_food => {
      breakfast_data.push(breakfast_food["name"])
    })
    var snack_data = []
    calendar_date["meals"][1]["foods"].forEach(snack_food => {
      snack_data.push(snack_food["name"])
    })
    var lunch_data = []
    calendar_date["meals"][2]["foods"].forEach(lunch_food => {
      lunch_data.push(lunch_food["name"])
    })
    var dinner_data = []
    calendar_date["meals"][3]["foods"].forEach(dinner_food => {
      dinner_data.push(dinner_food["name"])
    })

    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);

    cell1.innerHTML = `<h4>${entry_date}</h4>`;
    cell2.innerHTML = `<h4>${entry_goal}</h4>`;
    cell3.innerHTML = `<h4>${entry_consumed}</h4>`;
    cell4.innerHTML = `<h4>${entry_remaining}</h4>`;
    cell5.innerHTML = `<h4>${breakfast_data}</h4>`;
    cell6.innerHTML = `<h4>${snack_data}</h4>`;
    cell7.innerHTML = `<h4>${lunch_data}</h4>`;
    cell8.innerHTML = `<h4>${dinner_data}</h4>`;

  })
}

$( document ).on("load", getCalendar());

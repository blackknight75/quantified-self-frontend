const $ = require('jquery');
const host = "http://localhost:3000"

function logFood(msg) {
  console.log("name:", msg[2].name);
  console.log("calories:", msg[2].calories);
}

function getFood(){
  $.getJSON(`${host}/api/v1/foods`)
    .then(populateFood)
    .catch(function(error){
      console.log(error)
    })
}

// function reply_click(food_id){
//   debugger;
//   deleteFood(food_id);
// }

var trHTML = ''

function populateFood(foods){
  $.each(foods, function (i, food) {
    trHTML += `<tr id=${food.id}><td>`
           + food.name
           + '</td><td>'
           + food.calories
           + '</td><td>'
           + `<button id="${food.id}" class="remove">Delete</button>`
           + '</td></tr>';
  });

  $('#food-table').append(trHTML);
  $(".remove").click(function() {
    $(deleteFood(this.id));
  });
}

function deleteFood(food_id){
  $.ajax({
    method: "DELETE",
    url: `${host}/api/v1/foods/${food_id}`
  });
  $(`#${food_id}`).closest('tr').remove();
}

function newFood(){
  var foodName = $('#food-name')[0].value;
  var foodCalories = $('#food-calories')[0].value;

  $.ajax({
    method: "POST",
    url: `${host}/api/v1/foods`,
    data: { name: foodName, calories: foodCalories}
  })
}

$(document).ready(function() {
  $(getFood());
  $("#new-food").click(function() {
    newFood()
  });
})

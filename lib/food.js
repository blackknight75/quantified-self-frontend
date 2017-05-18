const $ = require('jquery');
const host = "https://quantified-self-dan-eric.herokuapp.com";

function getFood(){
  $.getJSON(`${host}/api/v1/foods`)
    .then(populateFood)
    .catch(function(error){
      console.log(error)
    })
}


function populateFood(foods){
  var trHTML = ''
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

// function filterFood(){
//   var foodFilter = $('#name-filter')[0].value;
//   var rows = $('#food-table tr.food-row')
//   rows.hide()
//   $.ajax({
//     method: "GET",
//     url:`${host}/api/v1/foods/`
//   })
// }


$(document).ready(function() {
  $(getFood());
  $("#create-food").click(function() {
    newFood()
  });

  $("#filter-foods").click(function() {
    filterFood()
  });
})

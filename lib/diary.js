const $ = require('jquery');
const host = "http://localhost:3000";
// const pry = require('pryjs')

function getDiary(){
  var date = `2017-05-18`;

  $.getJSON(`${host}/api/v1/diaries/${date}`).then(function(data){
      populateDiary(data)
    })
};


function populateDiary(data){
  var breakfast = ''
  var lunch     = ''
  var dinner    = ''
  var snack     = ''
  $.each(data, function(i, food){
    // debugger;
    if(food.category == 'Dinner') {
      dinner += `<tr id=${food.id}><td align="center">`
             + food.name
             + '</td><td align="center">'
             + food.calories
             + '</td><td align="center">'
             + `<button id="${food.id}" class="remove">Delete</button>`
             + '</td></tr>';
    } else if (food.category == 'Breakfast') {
      breakfast += `<tr id=${food.id}><td align="center">`
             + food.name
             + '</td><td align="center">'
             + food.calories
             + '</td><td align="center">'
             + `<button id="${food.id}" class="remove">Delete</button>`
             + '</td></tr>';

    }else if (food.category == 'Lunch') {
      lunch += `<tr id=${food.id}><td align="center">`
             + food.name
             + '</td><td align="center">'
             + food.calories
             + '</td><td align="center">'
             + `<button id="${food.id}" class="remove">Delete</button>`
             + '</td></tr>';

    }else if (food.category == 'Snack') {
      snack += `<tr id=${food.id}><td align="center">`
             + food.name
             + '</td><td align="center">'
             + food.calories
             + '</td><td align="center">'
             + `<button id="${food.id}" class="remove">Delete</button>`
             + '</td></tr>';

    }else{
      done();
    }
   
  })
  $('#dinner').append(dinner);
  $('#lunch').append(lunch);
  $('#breakfast').append(breakfast);
  $('#snack').append(snack);
  $(".remove").click(function() {
    $(removeFromTable(this.id));
  });
};

function removeFromTable(food_id){
  $.ajax({
    method: "DELETE",
    url: `${host}/api/v1/meal_food/${food_id}`
  })
  $(`#${food_id}`).closest('tr').remove();
}

$(document).ready(function(){
  getDiary();
})

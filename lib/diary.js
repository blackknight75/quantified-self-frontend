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
      dinner += `<tr id=${food.name}><td align="center">`
             + food.name
             + '</td><td align="center">'
             + food.calories
             + '</td><td align="center">'
             + `<button id="${food.name}" class="remove">Delete</button>`
             + '</td></tr>';
    } else if (food.category == 'Breakfast') {
      breakfast += `<tr id=${food.name}><td align="center">`
             + food.name
             + '</td><td align="center">'
             + food.calories
             + '</td><td align="center">'
             + `<button id="${food.name}" class="remove">Delete</button>`
             + '</td></tr>';

    }else if (food.category == 'Lunch') {
      lunch += `<tr id=${food.name}><td align="center">`
             + food.name
             + '</td><td align="center">'
             + food.calories
             + '</td><td align="center">'
             + `<button id="${food.name}" class="remove">Delete</button>`
             + '</td></tr>';

    }else if (food.category == 'Snack') {
      snack += `<tr id=${food.name}><td align="center">`
             + food.name
             + '</td><td align="center">'
             + food.calories
             + '</td><td align="center">'
             + `<button id="${food.name}" class="remove">Delete</button>`
             + '</td></tr>';

    }else{
      done()
    }
    // debugger;
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
  $(`#${food_id}`).closest('tr').remove();
}

$(document).ready(function(){
  getDiary();
})

// if (time < 10) {
//     greeting = "Good morning";
// } else if (time < 20) {
//     greeting = "Good day";
// } else {
//     greeting = "Good evening";
// }

//
// var groupBy = function(xs, key) {
//   return xs.reduce(function(rv, x) {
//     (rv[x[key]] = rv[x[key]] || []).push(x);
//     return rv;
//   }, {});
// };
// console.log(groupBy(['one', 'two', 'three'], 'length'));

const $ = require('jquery');
const host = "http://localhost:3000"

function getFood(){
  $.getJSON(`${host}/api/v1/foods`)
    .then(populateFood)
    .catch(function(error){
      console.log(error)
    })
}
var trHTML = ''

function populateFood(foods){
  $.each(foods, function (i, food) {
    trHTML += '<tr><td>' + food.name + '</td><td>' + food.calories + '</td></tr>';
  });

  $('#food-table').append(trHTML);
}

// $.post("http://",
//   {post: {name: "orange", calories: 100}}, //data passed to params
//   function(msg){
//     console.log("name:", msg.name);
//   },
//   "json"
// )

$(document).ready(function() {
  getFood()
})

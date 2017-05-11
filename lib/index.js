const $ = require('jquery');
const host = "http://localhost:3000"

function logFood(msg) {
  console.log("name:", msg[0].name);
  console.log("calories:", msg[0].calories);
}

function getFood(){
  $.getJSON(`${host}/api/v1/foods`)
    .then(logFood)
    .catch(function(error){
      console.log(error)
    })
}

getFood()

// $.post("http://",
//   {post: {name: "orange", calories: 100}}, //data passed to params
//   function(msg){
//     console.log("name:", msg.name);
//   },
//   "json"
// )

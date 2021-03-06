const $ = require('jquery');
const host = "https://quantified-self-dan-eric.herokuapp.com";
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
    if(food.category == 'Dinner') {
      dinner += `<tr id=${food.id}><td>`
             + food.name
             + '</td><td>'
             + food.calories
             + '</td><td>'
             + `<button id="${food.id}" class="remove">Remove</button>`
             + '</td></tr>';
    }else if (food.category == 'Breakfast') {
      breakfast += `<tr id=${food.id}><td>`
             + food.name
             + '</td><td>'
             + food.calories
             + '</td><td>'
             + `<button id="${food.id}" class="remove">Remove</button>`
             + '</td></tr>';

    }else if (food.category == 'Lunch') {
      lunch += `<tr id=${food.id}><td>`
             + food.name
             + '</td><td>'
             + food.calories
             + '</td><td>'
             + `<button id="${food.id}" class="remove">Remove</button>`
             + '</td></tr>';

    }else if (food.category == 'Snack') {
      snack += `<tr id=${food.id}><td>`
             + food.name
             + '</td><td>'
             + food.calories
             + '</td><td>'
             + `<button id="${food.id}" class="remove">Remove</button>`
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
           + `<input id="box${food.id}" type="checkbox"></input>`
           + '</td><td>'
           + food.name
           + '</td><td>'
           + food.calories
           + '</td></tr>';
  });

  $('#diary-food-table').append(trHTML);
  $(".remove").click(function() {
    $(deleteFood(this.id));
  });
}

function removeFromTable(food_id){
  $.ajax({
    method: "DELETE",
    url: `${host}/api/v1/meal_food/${food_id}`
  })
  $(`#${food_id}`).closest('tr').remove();
}

function addToBreakfast() {
  var diaryDate = $('#diary-date')[0].value
  getDiaryId(diaryDate);
}

function getDiaryId(date){
  $.ajax({
    method: "GET",
    url: `${host}/api/v1/diaries/get-id/${date}`
  }).then(function(data){
    var js_row = null
    var checked_rows = [];
    $("#diary-food-table > tbody > tr").each(function(i, row){
      if (i > 0){
        js_row = {
          diary_id: data[0].id,
          food_id: this.id,
          checked: this.children[0].firstChild.checked,
          name: this.children[1].innerText,
          calories: this.children[2].innerText,
          category: "Breakfast"
        }
        if (js_row.checked == true){
          checked_rows.push(js_row)
        }
      }
    })
    return checked_rows
  }).then(function(data){
    data.forEach(function(item, i){
      debugger;
      addMealToTable(item)
    })
  })
}

function addMealToTable(item){
  debugger;
  $.post(`${host}/api/v1/meals`, {category: item.category, diary_id: item.diary_id});
}

$(document).ready(function(){
  getDiary()
  $("#breakfast-button").click(function(){
      $(addToBreakfast())
  });
  $(getFood());
  $("")
})

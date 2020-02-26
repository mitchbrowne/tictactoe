$(document).ready(function() {

  //make color choices window respoonsive

const choice_array = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve'
]

for (let i = 0; i < 12; i++) {
  let $choice = $(`<div id="choice_${i}" class="choice_box"></div>`);
  $choice.html(`<input type="button" class="${choice_array[i]} choice_button" id="choice_one_${i}" value="">`);
  $('#player_one_grid').append($choice);
  $(`#choice_one_${i}`).on('click', function() {
    $(`#player_one_title`).removeClass();
    $(`#player_one_title`).addClass(`player_choice_title ${choice_array[i]}_title`);
    game.playerOneColorClass = `${choice_array[i]}`;
    game.playerOneTitleClass = `${choice_array[i]}_title`

  }).on('mousedown', function() {
    $(this).addClass('pressed_choice');
  }).on('mouseup', function() {
    $(this).removeClass('pressed_choice');
  });
};

for (let i = 0; i < 12; i++) {
  let $choice = $(`<div id="choice_${i}" class="choice_box"></div>`);
  $choice.html(`<input type="button" class="${choice_array[i]} choice_button" id="choice_two_${i}" value="">`);
  $('#player_two_grid').append($choice);
  $(`#choice_two_${i}`).on('click', function() {
    $(`#player_two_title`).removeClass();
    $(`#player_two_title`).addClass(`player_choice_title ${choice_array[i]}_title`);
    game.playerTwoColorClass = `${choice_array[i]}`;
    game.playerTwoTitleClass = `${choice_array[i]}_title`
  }).on('mousedown', function() {
    $(this).addClass('pressed_choice');
  }).on('mouseup', function() {
    $(this).removeClass('pressed_choice');
  });
};






});

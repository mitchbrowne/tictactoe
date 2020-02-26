$(document).ready(function() {

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
    let color = $(this).css('background-color');
    $(`#player_one_title`).css('color',`${color}`);
    game.playerOneColorClass = `${choice_array[i]}`;
    game.playerOneTitleClass = `${choice_array[i]}`

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
    let color = $(this).css('background-color');
    $(`#player_two_title`).css('color',`${color}`);
    game.playerTwoColor = `${color}`;
    // move choice to player object
  }).on('mousedown', function() {
    $(this).addClass('pressed_choice');
  }).on('mouseup', function() {
    $(this).removeClass('pressed_choice');
  });
};






});

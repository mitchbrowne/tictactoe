$(document).ready(function() {

  //refactor loop to one loop for both choices

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

// live update of player one name
$(`#player_one_title`).on('keyup', function() {
  if ($(this).val() === '') {
    game.playerOne = `Player One`
  } else {
    game.playerOne = $(this).val();
  }
  $('#message').html(`${game.playerOne}'s Turn`);
});

// live update of player two name
$(`#player_two_title`).on('keyup', function() {
  if ($(this).val() === '') {
    game.playerTwo = `Player Two`
  } else {
    game.playerTwo = $(this).val();
  }
});

// reset choice active button on player one
const chosenOne = function(currentElement) {
  console.log(currentElement.id);
  for (let i = 0; i < choice_array.length; i++) {
    $(`#choice_one_${i}`).removeClass(`choice_active`);
  };
}
// reset choice active button on player two
const chosenTwo = function(currentElement) {
  console.log(currentElement.id);
  for (let i = 0; i < choice_array.length; i++) {
    $(`#choice_two_${i}`).removeClass(`choice_active`);
  };
}

// create array of box color choices for player
for (let i = 0; i < choice_array.length; i++) {
  let $choice = $(`<div id="choice_${i}" class="choice_box"></div>`);
  $choice.html(`<input type="button" class="${choice_array[i]} choice_button" id="choice_one_${i}" value="">`);
  $('#player_one_grid').append($choice);

  // add active class class to position one button
  $(`#choice_one_0`).addClass(`choice_active`);

  $(`#choice_one_${i}`).on('click', function() {
    const currentElement = this;
    chosenOne(currentElement);
    $(this).addClass('choice_active');

    $(`#player_one_title`).removeClass();
    $(`#player_one_title`).addClass(`player_choice_title ${choice_array[i]}_title`);
    game.playerOneColorClass = `${choice_array[i]}`;
    game.playerOneTitleClass = `${choice_array[i]}_title`
    $(`#message`).removeClass();
    $(`#message`).addClass(`${game.playerOneTitleClass}`);
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

  // add active color class to position two button
  $(`#choice_two_1`).addClass(`choice_active`);

  $(`#choice_two_${i}`).on('click', function() {
    const currentElement = this;
    chosenTwo(currentElement);
    $(this).addClass('choice_active');

    $(`#player_two_title`).removeClass();
    $(`#player_two_title`).addClass(`player_choice_title ${choice_array[i]}_title`);
    game.playerTwoColorClass = `${choice_array[i]}`;
    game.playerTwoTitleClass = `${choice_array[i]}_title`
    $(`#start_button`).css({'opacity':'1', 'animation':'pulse 2s infinite'});
  }).on('mousedown', function() {
    $(this).addClass('pressed_choice');
  }).on('mouseup', function() {
    $(this).removeClass('pressed_choice');
  });
};

$(`#start_button`).on('click', function() {
  $(this).css({'opacity':'0.4', 'animation':'none'});
})






});

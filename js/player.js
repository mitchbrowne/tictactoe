$(document).ready(function() {

// array of css color classes for user to choose
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
];

// live update of player one/two name from player page input
const liveInput = function(player) {
  const id = (player) ? `#player_one_title` : `#player_two_title`;
  const playerNumber = (player) ? `playerOne` : `playerTwo`;
  const playerName = (player) ? `Player One` : `Player Two`;

  $(`${id}`).on('keyup', function() {
    if ($(this).val() === '') {
      game[`${playerNumber}`] = `${playerName}`;
    } else {
      game[`${playerNumber}`] = $(this).val();
    }
    if (player) $('#message').html(`${game[playerNumber]}'s Turn`);
  });
};

// call live input functions
liveInput(true);
liveInput(false);


// resets all player choice buttons to non-active
const resetButtonChoice = function(currentElement, choiceID) {
  for (let i = 0; i < choice_array.length; i++) {
    $(`#${choiceID}${i}`).removeClass(`choice_active`);
  };
}

// create color array choices for user, apply color and title classes to object once player has chosen
const createColorChoices = function(player) {
  const choiceID = (player) ? `choice_one_` : `choice_two_`;
  const playerGrid = (player) ? `#player_one_grid` : `#player_two_grid`;
  const id = (player) ? `#player_one_title` : `#player_two_title`;
  const colorClass = (player) ? `playerOneColorClass` : `playerTwoColorClass`
  const titleClass = (player) ? `playerOneTitleClass` : `playerTwoTitleClass`

  for (let i = 0; i < choice_array.length; i++) {
    let $choice = $(`<div id="choice_${i}" class="choice_box"></div>`);
    $choice.html(`<input type="button" class="${choice_array[i]} choice_button" id="${choiceID}${i}" value="">`);
    $(`${playerGrid}`).append($choice);

    // add active class to position one button for player one and position two for player two on game start
    $('#choice_one_0').addClass('choice_active');
    $('#choice_two_1').addClass('choice_active');

    // on click of color, apply choice active class and update object details
    $(`#${choiceID}${i}`).on(`click`, function() {
      const currentElement = this;
      resetButtonChoice(currentElement, choiceID);
      $(this).addClass(`choice_active`);

      $(`${id}`).removeClass();
      $(`${id}`).addClass(`player_choice_title ${choice_array[i]}_title`);
      game[`${colorClass}`] = `${choice_array[i]}`;
      game[`${titleClass}`] = `${choice_array[i]}_title`;
      // if first player, update message board color with first player choice
      if (player) {
        $(`#message`).removeClass();
        $(`#message`).addClass(`${game[`${titleClass}`]}`);
      } else {
        // make start button pulse once player two has chosen
        $(`#start_button`).css({'opacity':'1', 'animation':'pulse 2s infinite'});
      }
    }).on('mousedown', function() {
      // show button pressed
      $(this).addClass('pressed_choice');
    }).on('mouseup', function() {
      $(this).removeClass('pressed_choice');
    });
  };
};

// call create color buttons functions
createColorChoices(true);
createColorChoices(false);

// reset start button animation to none, after pulsing
$(`#start_button`).on('click', function() {
  $(this).css({'opacity':'0.4', 'animation':'none'});
});

});

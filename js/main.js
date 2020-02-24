$(document).ready(function() {
  console.log("Let's tango! cha cha cha");

//++++++++++++++++
// GAME OBJECT
//++++++++++++++++
const game = {
  boardWidth: 3, // width of game board
  boardSize: 0, // total number of cells
  board: [], // current status of board after each turn
  turn: [], // {playerOne: 1, box: 0}
  buttonsClicked: [], // ['button_0','button_6']
  firstPlayerTurn: true, // playerOne = true, playerTwo = false
  gameWon: false, // true if won
  currentGame: {}, // every detail about current game
  previousGames: [], // every detail about each previous game

  // create board using boardWidth input
  createBoard: function() {
    this.boardSize = this.boardWidth * this.boardWidth;
    this.board.length = this.boardSize;
    let count = 0;
    for (let i = 0; i < this.board.length; i++) {
      if(i % this.boardWidth === 0) {
        count++;
        let $row = $(`<div class="row" id="row_${count}"></div>`);
        $('.container').append($row);
      }
      let $box = $(`<div class="box" id="box_${i}"></div>`);
      $box.html(`<input type="button" class="button" id="button_${i}" value="Box ${i}">`);
      $(`#row_${count}`).append($box);
    }
  },

  // currently obsolete function
  gamePlay: function(button) {
    turnLog(button);
    testWin();
  },

  addButtonClicks: function() {
    for (let i = 0; i < this.boardSize; i++) {
      console.log('1');
      $(`#button_${i}`).on('click', function() {
        console.log(`Button ${i} is qliquey`);
        runFunctions(`button_${i}`);
      });
    };
  },


};


//++++++++++++++++
// CREATE BOARD
//++++++++++++++++

  game.createBoard();
  game.addButtonClicks();


//++++++++++++++++
// FUNCTIONS TO RUN
//++++++++++++++++

const runFunctions = function(button) {
  turnLog(button);
};

//++++++++++++++++
// USER TURN
//++++++++++++++++

const turnLog = function(button) {
  // test if button has already been clicked
  for (let i = 0; i < game.buttonsClicked.length; i++) {
    if (button === game.buttonsClicked[i]) {
      console.log("Button already clicked.");
      return;
    };
  };

  //assign button and number variables
  let $button = $(`#${button}`);
  let number = button[button.length-1];

  // update button visual
  if (game.firstPlayerTurn) {
    $button.addClass('active-red');
  } else {
    $button.addClass('active-blue');
  };

  // push turn information to game object
  game.turn.push({playerOne: `${game.firstPlayerTurn}`, box: `${$button.attr('id')}`});

  // push button to buttonsClicked array object
  game.buttonsClicked.push(button);

  // update gameBoard array with new turn position
  game.board[number] = game.firstPlayerTurn;

  // test if player has won
  testWin();

  // final stage: switch player turn
  game.firstPlayerTurn = !game.firstPlayerTurn;

  $button.addClass('active-red');
};

//++++++++++++++++
// TEST WIN
//++++++++++++++++

const testWin = function() {
  let board = game.board;
  let player = game.firstPlayerTurn
  // has game already been won?
  if (game.gameWon) {
    return;
  // if number of turns is over 8, then no winner
  } else if (game.gameWon === false && game.turn.length > 7) {
    console.log("TIE");
  // top row
  } else if (player === board[0] && board[0] === board[1] && board[1] === board[2]) {
    game.gameWon = true;
  // middle row
  } else if (player === board[3] && board[3] === board[4] && board[4] === board[5]) {
    game.gameWon = true;
  // bottom row
  } else if (player === board[6] && board[6] === board[7] && board[7] === board[8]) {
    game.gameWon = true;
  //left column
  } else if (player === board[0] && board[0] === board[3] && board[3] === board[6]) {
    game.gameWon = true;
  // middle column
  } else if (player === board[1] && board[1] === board[4] && board[4] === board[7]) {
    game.gameWon = true;
    // right column
  } else if (player === board[2] && board[2] === board[5] && board[5] === board[8]) {
    game.gameWon = true;
    // top left bottom right diagonal
  } else if (player === board[0] && board[0] === board[4] && board[4] === board[8]) {
    game.gameWon = true;
    // bottom left top right diagonal
  } else if (player === board[2] && board[2] === board[4] && board[4] === board[6]) {
    game.gameWon = true;
  } else {
    console.log("Continue playing");
  };
    console.log(`${game.gameWon}`);
    console.log(`${board}`);
  };

// document end
})

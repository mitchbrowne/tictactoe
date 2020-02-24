$(document).ready(function() {

//++++++++++++++++
// GAME OBJECT
//++++++++++++++++
const game = {

  //++++++++++++++++
  // OBJECT VARIABLES
  //++++++++++++++++
  gameNumber: 0,
  boardWidth: 3, // width of game board
  boardSize: 0, // total number of cells
  board: [], // current status of board after each turn
  turn: [], // {playerOne: 1, box: 0}
  buttonsClicked: [], // ['button_0','button_6']
  currentButton: '',
  firstPlayerTurn: true, // playerOne = true, playerTwo = false
  gameWon: false, // true if won
  playerWon: '', // true if playerone won || false if playertwo won
  winType: '',
  currentGame: {}, // every detail about current game
  previousGames: [], // every detail about each previous game
  winScenario: [
    [0,1,2,'top row'],
    [3,4,5, 'middle row'],
    [6,7,8, 'bottom row'],
    [0,3,6, 'left column'],
    [1,4,7, 'middle column'],
    [2,5,8, 'right column'],
    [0,4,8, 'top left diagonal'],
    [2,4,6, 'bottom left diagonal']
  ],

  //++++++++++++++++
  // OBJECT METHODS
  //++++++++++++++++

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
  // gamePlay: function(button) {
  //   turnLog(button);
  //   testWin();
  // },

  // adds ability to click buttons when game begins
  addButtonClicks: function() {
    for (let i = 0; i < this.boardSize; i++) {
      $(`#button_${i}`).on('click', function() {
        console.log(`Button ${i} is qliquey`);
        runFunctions(`button_${i}`);
      });
      this.firstPlayerTurn = true;
    };
  },

  // removes ability to click any buttons once game is finished
  removeButtonClicks: function() {
    for (let i = 0; i < this.boardSize; i++) {
      $(`#button_${i}`).off('click')
    };
  },

  // user plays a turn
  playTurn: function() {
    //assign button and number variables
    let $button = $(`#${this.currentButton}`);
    let button = this.currentButton;
    let number = button[button.length-1];


    // test if button has already been clicked
    for (let i = 0; i < this.buttonsClicked.length; i++) {
      if (button === this.buttonsClicked[i]) {
        console.log("Button already clicked.");
        return;
      };
    };
    console.log("player: "+this.firstPlayerTurn);
    // update button visual
    if (this.firstPlayerTurn) {
      $button.addClass('active_red');
    } else {
      $button.addClass('active_blue');
    };

    // push turn information to game object
    this.turn.push({playerOne: `${this.firstPlayerTurn}`, box: `${$button.attr('id')}`});

    // push button to buttonsClicked array object
    this.buttonsClicked.push(button);

    // update gameBoard array with new turn position
    this.board[number] = this.firstPlayerTurn;

    // test if player has won
    testWin();

    // final stage: switch player turn
    this.firstPlayerTurn = !this.firstPlayerTurn;
  },

  resetGame: function() {
    // remove ability to click any more boxes
    this.removeButtonClicks();
    // show reset button
    $('.reset').addClass('active_reset');
    // store current game data in previousGames array
    this.currentGame = {
      gameNumber: this.gameNumber,
      boardWidth: this.boardWidth,
      boardSize: this.boardSize,
      board: this.board,
      turn: this.turn,
      buttonsClicked: this.buttonsClicked,
      gameWon: this.gameWon,
      winType: this.winType,
      playerWon: this.playerWon,
      time: new Date()
    };
    this.previousGames.push(this.currentGame)

    // save button array before reset
    let buttonArray = this.buttonsClicked;

    // reset all game settings
    this.gameNumber = this.gameNumber + 1;
    this.board = []; // current status of board after each turn
    this.turn = []; // {playerOne: 1, box: 0}
    this.buttonsClicked = []; // ['button_0','button_6']
    this.currentButton = '';
    this.firstPlayerTurn = true; // playerOne = true, playerTwo = false
    this.gameWon = false; // true if won
    this.playerWon = '';
    this.winType = '';
    this.currentGame = {}; // every detail about current game

    console.log(this.previousGames);


    //reset button styling
    $('.reset').on('click', function() {
      for (let i = 0; i < buttonArray.length; i++) {
        $(`#${buttonArray[i]}`).removeClass('active_red active_blue');
      };
      $(this).removeClass('active_reset');
      game.addButtonClicks();
    });
  }


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
  game.currentButton = button;
  game.playTurn();
};

//++++++++++++++++
// TEST WIN
//++++++++++++++++

const testWin = function() {
  let board = game.board;
  let player = game.firstPlayerTurn
  // // has game already been won?
  // if (game.gameWon) {
  //   game.resetGame();
  //   return;
  // // if number of turns is over 8, then no winner
  // } else if (game.gameWon === false && game.turn.length > 7) {
  //   console.log("DRAW");
  //   game.gameWon = false;
  //   game.playerWon = `draw`;
  //   game.resetGame();
  // // top row
  // } else if (player === board[0] && board[0] === board[1] && board[1] === board[2]) {
  //   game.gameWon = true;
  //   game.playerWon = `${player}`;
  //   game.resetGame();
  // // middle row
  // } else if (player === board[3] && board[3] === board[4] && board[4] === board[5]) {
  //   game.gameWon = true;
  //   game.playerWon = `${player}`;
  //   game.resetGame();
  // // bottom row
  // } else if (player === board[6] && board[6] === board[7] && board[7] === board[8]) {
  //   game.gameWon = true;
  //   game.playerWon = `${player}`;
  //   game.resetGame();
  // //left column
  // } else if (player === board[0] && board[0] === board[3] && board[3] === board[6]) {
  //   game.gameWon = true;
  //   game.playerWon = `${player}`;
  //   game.resetGame();
  // // middle column
  // } else if (player === board[1] && board[1] === board[4] && board[4] === board[7]) {
  //   game.gameWon = true;
  //   game.playerWon = `${player}`;
  //   game.resetGame();
  //   // right column
  // } else if (player === board[2] && board[2] === board[5] && board[5] === board[8]) {
  //   game.gameWon = true;
  //   game.playerWon = `${player}`;
  //   game.resetGame();
  //   // top left bottom right diagonal
  // } else if (player === board[0] && board[0] === board[4] && board[4] === board[8]) {
  //   game.gameWon = true;
  //   game.playerWon = `${player}`;
  //   game.resetGame();
  //   // bottom left top right diagonal
  // } else if (player === board[2] && board[2] === board[4] && board[4] === board[6]) {
  //   game.gameWon = true;
  //   game.playerWon = `${player}`;
  //   game.resetGame();
  // } else {
  //   console.log("Continue playing");
  // };

  for (let i = 0; i < game.winScenario.length; i++) {
    let a = game.winScenario[i];
    if (player === board[a[0]] && board[a[0]] === board[a[1]] && board[a[1]] === board[a[2]]) {
      game.gameWon = true;
      game.playerWon = `${player}`;
      game.winType =
      game.resetGame();
    } else if (game.turn.length > 7) {
      game.gameWon = false;
      game.playerWon = `draw`;
      game.winType = `draw`;
      game.resetGame();
    } else {
      console.log(`Continue playing.`);
    };
  };


};

// document end
})

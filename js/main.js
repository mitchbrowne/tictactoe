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

  //+++++++++++++++++++
  // ADD CLICK ABILITY
  //+++++++++++++++++++

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

  //++++++++++++++++++++++
  // REMOVE CLICK ABILITY
  //++++++++++++++++++++++

  // removes ability to click any buttons once game is finished
  removeButtonClicks: function() {
    for (let i = 0; i < this.boardSize; i++) {
      $(`#button_${i}`).off('click')
    };
  },

  //++++++++++++++++
  // PLAYER TURN
  //++++++++++++++++

  // user plays a turn
  playTurn: function() {
    //assign button and number variables
    let $button = $(`#${this.currentButton}`);
    let button = this.currentButton;
    let number = button[button.length-1];

    // test if button has already been clicked
    if (this.buttonsClicked.includes(`${button}`)) {
      console.log("Button already clicked.");
      return;
    }

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
    this.testWin();

    // final stage: switch player turn
    this.firstPlayerTurn = !this.firstPlayerTurn;
  },

  //++++++++++++++++
  // TEST WIN
  //++++++++++++++++

  testWin: function() {
    let board = this.board;
    let player = this.firstPlayerTurn

    for (let i = 0; i < this.winScenario.length; i++) {
      let a = this.winScenario[i];
      if (player === board[a[0]] && board[a[0]] === board[a[1]] && board[a[1]] === board[a[2]]) {
        this.gameWon = true;
        this.playerWon = `${player}`;
        this.winType = `${a[3]}`;
        this.resetGame();
        return;
      } else if (game.turn.length > 8) {
        this.gameWon = false;
        this.playerWon = `draw`;
        this.winType = `draw`;
        this.resetGame();
        return;
      };
    };
  },

  //++++++++++++++++
  // RESET GAME
  //++++++++++++++++

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
      $(this).off('click');
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



// document end
})

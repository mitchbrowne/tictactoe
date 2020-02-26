let game;

$(document).ready(function() {

// ask user for name, update object
// update message board with color and name

//++++++++++++++++
// GAME OBJECT
//++++++++++++++++

game = {

  //++++++++++++++++
  // OBJECT VARIABLES
  //++++++++++++++++

  gameNumber: window.localStorage.length,
  boardWidth: 3, // width of game board
  boardSize: 0, // total number of cells
  board: [], // current status of board after each turn
  turn: [], // {playerOne: 1, box: 0}
  buttonsClicked: [], // ['button_0','button_6']
  currentButton: '',
  playerOne: 'Player One',
  playerOneColorClass: `one`,
  playerOneTitleClass: `one_title`,
  playerTwo: 'Player Two',
  playerTwoColorClass: `two`,
  playerTwoTitleClass: `two_title`,
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


  //++++++++++++++++++++++++++
  // OBJECT METHODS
  //++++++++++++++++++++++++++

  //++++++++++++++++
  // START GAME
  //++++++++++++++++

  startGame: function() {
    this.createBoard();
    this.addButtonClicks();
  },

  //++++++++++++++++
  // CREATE BOARD
  //++++++++++++++++

  // create board using boardWidth input
  createBoard: function() {
    this.boardSize = this.boardWidth * this.boardWidth;
    this.board.length = this.boardSize;
    let count = 0;
    for (let i = 0; i < this.board.length; i++) {
      let $box = $(`<div class="box" id="box_${i}"></div>`);
      $box.html(`<input type="button" class="button" id="button_${i}" value="">`);
      $(`.game_board`).append($box);
    }
  },

  //+++++++++++++++++++
  // ADD CLICK ABILITY
  //+++++++++++++++++++

  // adds ability to click buttons when game begins
  addButtonClicks: function() {
    for (let i = 0; i < this.boardSize; i++) {
      $(`#button_${i}`).on('click', function() {
        game.currentButton = `button_${i}`;
        game.playTurn();
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
      console.log(game.playerOneColorClass);
      $button.addClass(`${game.playerOneColorClass}`);
    } else {
      console.log(`${game.playerTwoColorClass}`);
      $button.addClass(`${game.playerTwoColorClass}`);
    };


    // push turn information to game object
    this.turn.push({playerOne: `${this.firstPlayerTurn}`, box: `${$button.attr('id')}`});

    // push button to buttonsClicked array object
    this.buttonsClicked.push(button);

    // update gameBoard array with new turn position
    this.board[number] = this.firstPlayerTurn;

    // test if player has won
    this.testWin();

    // move into function if game not won AND first turn has been taken
    if (!this.gameWon && this.turn.length != 0) {
      // final stage: switch player turn
      this.firstPlayerTurn = !this.firstPlayerTurn;
      console.log("IN GAME")
      // relay message to user
      this.messageBoard(0);
    };
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
        this.messageBoard(1); //win message
        this.resetGame();
        return;
      } else if (game.turn.length > 8) {
        this.gameWon = false;
        this.playerWon = `draw`;
        this.winType = `draw`;
        this.messageBoard(2); //draw message
        this.resetGame();
        return;
      };
    };
  },

  //++++++++++++++++
  // MESSAGE BOARD
  //++++++++++++++++

  messageBoard: function(message_number) {
    // 0: player turn, 1: player win, 2: player draw, 3: reset
    const num = +message_number;
    const player = (this.firstPlayerTurn) ? `playerOneTitleClass`:`playerTwoTitleClass`;
    const playerID = (this.firstPlayerTurn) ? `playerOne`:`playerTwo`;


    if (num === 0) {
      $('#message').removeClass();
      $('#message').addClass(`${this[`${player}`]}`).html(`${this[`${playerID}`]}'s Turn`);
    } else if (num === 1) {
      $('#message').html(`${this[`${playerID}`]} Wins!`);
    } else if (num === 2) {
      $('#message').html(`Draw!`);
    } else if (num === 3) {
      $('#message').addClass(`turn_first`).html(`Player 1 Turn`);
    };
  },

  //++++++++++++++++
  // RESET GAME
  //++++++++++++++++

  resetGame: function() {
    // remove ability to click any more boxes
    this.removeButtonClicks();
    // show reset button
    $('#reset_game').addClass('active_reset');

    // store current game data in previousGames array
    this.currentGame = {
      gameNumber: this.gameNumber,
      boardWidth: this.boardWidth,
      boardSize: this.boardSize,
      board: this.board,
      turn: this.turn,
      buttonsClicked: this.buttonsClicked,
      playerOne: 'Player One',
      playerOneColor: 'green',
      playerTwo: 'Player Two',
      playerTwoColor: 'yellow',
      gameWon: this.gameWon,
      winType: this.winType,
      playerWon: this.playerWon,
      time: new Date()
    };
    this.previousGames.push(this.currentGame)
    window.localStorage.setItem(`${this.gameNumber}`,JSON.stringify(this.currentGame));

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

    //reset button styling & add click to board buttons
    $('#reset_game').on('click', function() {
      console.log("inside reset click");
      for (let i = 0; i < buttonArray.length; i++) {
        $(`#${buttonArray[i]}`).css('background-color', '#FFB096');
      };
      $(this).removeClass('active_reset');
      game.addButtonClicks();
      game.messageBoard(3);
      $(this).off('click');
    });
  }

// game object end
};


//++++++++++++++++
// START GAME
//++++++++++++++++

game.startGame();

//++++++++++++++++
// TEST GAMES
//++++++++++++++++

// $('#test_game_1').on('click', function() {
//   $('#button_0').trigger('click');
//   $('#button_3').trigger('click');
//   $('#button_1').trigger('click');
//   $('#button_4').trigger('click');
//   $('#button_2').trigger('click');
// });
//
// $('#test_game_2').on('click', function() {
//   $('#button_0').trigger('click');
//   $('#button_2').trigger('click');
//   $('#button_1').trigger('click');
//   $('#button_5').trigger('click');
//   $('#button_4').trigger('click');
//   $('#button_8').trigger('click');
// });
//
// $('#test_game_3').on('click', function() {
//   $('#button_6').trigger('click');
//   $('#button_7').trigger('click');
//   $('#button_8').trigger('click');
//   $('#button_3').trigger('click');
//   $('#button_4').trigger('click');
//   $('#button_5').trigger('click');
//   $('#button_1').trigger('click');
//   $('#button_0').trigger('click');
//   $('#button_2').trigger('click');
// });

// document end
})

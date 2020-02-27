let game;

$(document).ready(function() {

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
  gameWon: '', // Win or Draw
  playerWon: '', // true if playerone won || false if playertwo won
  winType: '', // middle column, or top row, etc
  currentGame: {}, // every detail about current game
  previousGames: [], // every detail about each previous game
  winScenario: [
    [0,1,2,'Top row'],
    [3,4,5, 'Middle row'],
    [6,7,8, 'Bottom row'],
    [0,3,6, 'Left column'],
    [1,4,7, 'Middle column'],
    [2,5,8, 'Right column'],
    [0,4,8, 'Top left diagonal'],
    [2,4,6, 'Bottom left diagonal']
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
      return;
    }

    // update button visual
    if (this.firstPlayerTurn) {
      $button.addClass(`${game.playerOneColorClass}`);
    } else {
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
    if (this.turn.length != 0) {
      // final stage: switch player turn
      this.firstPlayerTurn = !this.firstPlayerTurn;
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
        const playerName = (this.player) ? `playerOne` : `playerTwo`
        this.gameWon = 'Win';
        this.playerWon = `${this[playerName]}`;
        this.winType = `${a[3]}`;
        this.messageBoard(1); //win message
        this.resetGame();
        return;
      } else if (game.turn.length > 8) {
        this.gameWon = 'Draw';
        this.playerWon = `Draw`;
        this.winType = `Draw`;
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
      $('#message').removeClass();
      $('#message').addClass(`${this.playerOneTitleClass}`).html(`${this.playerOne}'s Turn`);
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
      playerOne: this.playerOne,
      playerOneColorClass: this.playerOneColorClass,
      playerTwo: this.playerTwo,
      playerTwoColorClass: this.playerTwoColorClass,
      gameWon: this.gameWon,
      winType: this.winType,
      playerWon: this.playerWon,
      time: new Date()
    };
    this.previousGames.push(this.currentGame);
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
    this.gameWon = ''; // true if won
    this.playerWon = '';
    this.winType = '';
    this.currentGame = {}; // every detail about current game


    //reset button styling & add click to board buttons
    $('#reset_game').on('click', function() {
      for (let i = 0; i < buttonArray.length; i++) {
        $(`#${buttonArray[i]}`).removeClass(`${game.playerOneColorClass}`);
        $(`#${buttonArray[i]}`).removeClass(`${game.playerTwoColorClass}`);
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

// document end
})

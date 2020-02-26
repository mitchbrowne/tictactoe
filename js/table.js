$(document).ready(function() {

  const columns = [
    { "name": "gameNumber", "title": "Game", "breakpoints": "xs"}, // gameNumber
    { "name": "playerOne", "title": "Player One", "breakpoints": "xs"}, // playerOne name
    { "name": "playerOneColor", "title": "Color", "breakpoints": "xs"}, // playerOne color
    { "name": "playerTwo", "title": "Player Two", "breakpoints": "xs"}, // playerTwo name
    { "name": "playerTwoColor", "title": "Color", "breakpoints": "xs"}, // playerTwo color
    { "name": "gameWon", "title": "Win/Draw", "breakpoints": "xs"}, // gameOutcome win/draw
    { "name": "winType", "title": "Type", "breakpoints": "xs"}, // how they won/draw
    { "name": "playerWon", "title": "Winner", "breakpoints": "xs"}, // which player won, none if draw
    // { "name": "board", "title": "Board", "breakpoints": "xs"}, // what board looked like at end
  ];

  const rowArray = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    rowArray.push(JSON.parse(localStorage.getItem(`${i}`)));
  }

  const table = [];

  for (let j = 0; j < rowArray.length; j++) {
    let row = rowArray[j];
    let rowFinal = {
      gameNumber: row.gameNumber,
      playerOne: row.playerOne,
      playerOneColor: row.playerOneColor,
      playerTwo: row.playerTwo,
      playerTwoColor: row.playerTwoColor,
      gameWon: row.gameWon,
      winType: row.winType,
      playerWon: row.playerWon,
    }
    table.push(rowFinal);
  }

  console.log(table);

  $('.table').footable({
    "columns": columns,
    "rows": table
  });




// end of document
});

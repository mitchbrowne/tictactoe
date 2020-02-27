$(document).ready(function() {

  // add constant reload

  const columns = [
    { "name": "gameNumber", "title": "Game", "breakpoints": "xs"}, // gameNumber
    { "name": "playerOne", "title": "Player One", "breakpoints": "xs"}, // playerOne name
    { "name": "playerTwo", "title": "Player Two", "breakpoints": "xs"}, // playerTwo name
    { "name": "gameWon", "title": "Win/Draw", "breakpoints": "xs"}, // gameOutcome win/draw
    { "name": "winType", "title": "Type", "breakpoints": "xs"}, // direction they won/draw
    { "name": "playerWon", "title": "Winner", "breakpoints": "xs"}, // which player won, draw if draw
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
      playerTwo: row.playerTwo,
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

$(document).ready(function() {

  // add color to color column
  // add constant reload

  const columns = [
    { "name": "gameNumber", "title": "Game", "breakpoints": "xs"}, // gameNumber
    { "name": "playerOne", "title": "Player One", "breakpoints": "xs"}, // playerOne name
    { "name": "playerOneColorClass", "title": "Color", "breakpoints": "xs"}, // playerOne color
    { "name": "playerTwo", "title": "Player Two", "breakpoints": "xs"}, // playerTwo name
    { "name": "playerTwoColorClass", "title": "Color", "breakpoints": "xs"}, // playerTwo color
    { "name": "gameWon", "title": "Win/Draw", "breakpoints": "xs"}, // gameOutcome win/draw
    { "name": "winType", "title": "Type", "breakpoints": "xs"}, // how they won/draw
    { "name": "playerWon", "title": "Winner", "breakpoints": "xs"}, // which player won, none if draw
    // { "name": "board", "title": "Board", "breakpoints": "xs"}, // what board looked like at end
  ];
  //
  // $(document).on('change', function() {
  //
  // });

  const rowArray = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    rowArray.push(JSON.parse(localStorage.getItem(`${i}`)));
  }

  // 		"rows": [{
  // 			// supply options for the row
  // 			"options": {
  // 				"expanded": true,
  // 				"classes": "your-css-class"
  // 			},
  // 			"value": {
  // 				"id": {
  // 					// supply options for the id cell
  // 					"options": {
  // 						"classes": "your-css-class"
  // 					},
  // 					"value": 1
  // 				},
  // 				"firstName": "Dennise",
  // 				"lastName": "Fuhrman",
  // 				"jobTitle": "High School History Teacher",
  // 				"started": "November 8th 2011",
  // 				"dob": "July 25th 1960"
  // 			}
  // 		},{
  // 			...
  // 		}]
  // 	});
  // });

// let first = {
//   // supply options for the row
//   "options": {
//     "expanded": true,
//     "classes": "one"
//   },
//   "value": {
//     "id": {
//       // supply options for the id cell
//       "options": {
//         "classes": "one"
//       },
//       "value": 1
//     },
//     "gameNumber": "-1",
//     "playerOne": "Fuhrman",
//     "playerOneColorClass": "High School History Teacher",
//     "playerTwo": "November 8th 2011",
//     "playerTwoColorClass": "July 25th 1960",
//     "gameWon": "July 25th 1960",
//     "winType": "July 25th 1960",
//     "playerWon": "July 25th 1960"
//   }
// };

  const table = [];
// table.push(first);
  for (let j = 0; j < rowArray.length; j++) {
    let row = rowArray[j];
    let rowFinal = {
      gameNumber: row.gameNumber,
      playerOne: row.playerOne,
      playerOneColorClass: row.playerOneColor,
      playerTwo: row.playerTwo,
      playerTwoColorClass: row.playerTwoColor,
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

  // $('.table').each(function(index) {
  //   console.log("HEY");
  //   $cells = $(this).find("td");
  //   $cells.each(function(cellIndex) {
  //       var cellHtml = $(this).html();
  //       $(this).addClass(`one`);
  //   });
// });




// end of document
});

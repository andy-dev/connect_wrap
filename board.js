// Pseudocode
//1. Board object
//  columns, rows

// var Board = function(){
//   this.columns = 7;
//   this.rows = 6;
// };

var color = ["black", "red"];

var turn = color[i];
var i = 0;



$(document).on("click", function(){

  if (turn === "red") {
    i++;
  }
  else {
    i--;
  };
})


function boardS() {
  var rows = $("section");
  var boardString = "";

  rows.each(function(index, row){
    for (var i=0; i < row.children.length; i++){
      if (row.children[i].className == "red"){
        boardString += "r";
      }
      else if (row.children[i].className == "black") {
        boardString += "b";
      }
      else {
        boardString += "x";
      }
    }
  })
  return boardString;
}

var rows = $("section");

rows.on("click", function(){
  var column = $(this).children();
  for (var i=5; i >= 0; i--){
    // red is going to be color var later
    var cell = $(column[i]);
    if (!cell.hasClass(turn)){
      cell.addClass(turn);
      return;
    }

  }
})

// Game Module
(function() {

  "use strict";

  var rows = $("section");
  var color = ["black", "red"];
  var i = 0;
  var turn;


  // Choose whos turn it is
  var decideTurn = function() {

    turn = color[i];

    function moveCounter(){
      if (turn === "red") ? i++ : i--;
    };

    function bindCounterEvent() {
      $(document).on("click", moveCounter);
    };

    bindCounterEvent();
  };

  // Create String that will be used to pick winner

  var createBoardString = function() {

    var boardString = "";

    rows.each(function(index, row){
      for (var i=0; i < row.children.length; i++){
        if (row.children[i].className == "red"){
          boardString += "r";
        } else if (row.children[i].className == "black") {
          boardString += "b";
        } else {
          boardString += "x";
        }
      }
    });
    return boardString;
  };

  // Choose What Color is placed

  var cellColorDeligation = function() {

    var column = $(this).children();

    function decidePiecePlaced(){
      for (var i=5; i >= 0; i--){
        // red is going to be color var later
        var cell = $(column[i]);
        if (!cell.hasClass(turn)) {
          cell.addClass(turn);
          return;
        }
      }
    };

    function cellColorEventBind() {
      rows.on("click", decidePiecePlaced)
    };

    cellColorEventBind();
  };

  var init = function() {
    cellColorDeligation();
    decideTurn();
    createBoardString();
  };

  window.gameModule = function() {
    return {
      init: init,
    }
  };

})()
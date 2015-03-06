// Pseudocode
//1. Board object
//  columns, rows


// Game Module
(function() {

  "use strict";

  var rows = $("section");
  var color = ["red","black"];
  var i;
  var turn;

  // Choose whos turn it is

  var decideTurn = function() {
    i = 0
    turn = color[i];

    function moveCounter(){
    turn === "red" ? i++ : i--;
    };

    function bindCounterEvent() {
      $(document).on("click", moveCounter);
    };

    bindCounterEvent();
    return turn
  };

  // Choose What Color is placed

  var cellColorDeligation = function() {

    turn = decideTurn()

    function decidePiecePlaced(){
      var column = $(this).children();

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
      rows.on("click", decidePiecePlaced);
      rows.on("click", createBoardString); // Temp Bind for testing
      // rows.on("click", decideTurn); // Temp Bind for testing
    };

    cellColorEventBind();
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
    // return boardString;
    console.log(boardString); // Testing
  };


  var init = function() {
    cellColorDeligation();
    // decideTurn();

  };

  window.gameModule = function() {
    return {
      init: init,
    }
  };

})()

var game = gameModule()
game.init()
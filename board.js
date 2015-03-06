// Pseudocode
//1. Board object
//  columns, rows


// Game Module
(function() {

  "use strict";

  var rows = $("section");
  var turnCounter = 0;
  var colors;
  var playerTurn;

  // Choose whos turn it is
  var decideTurn = function() {
    colors = ["red","black"];


    function moveCounter(){
      playerTurn = colors[turnCounter];
      playerTurn === "red" ? turnCounter++ : turnCounter--;
      console.log(turnCounter);
    };

    function bindCounterEvent() {
      $(document).on("click", moveCounter);
    };

    bindCounterEvent();

  };

  // Choose What Color is placed

  var cellColorDeligation = function() {

    function decidePiecePlaced(){

      for (var i=5; i >= 0; i--){
      var column = $(this).children();
        // red is going to be color var later
        // turn works but value doesn't change
        var cell = $(column[i]);
        if (!cell.hasClass('red')) {
          cell.addClass('red');
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
    decideTurn();
  };

  window.gameModule = function() {
    return {
      init: init,
    }
  };

})()

var game = gameModule()
game.init()
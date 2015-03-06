// Pseudocode
//1. Board object
//  columns, rows


// Game Module
(function() {

  "use strict";

  var rows = $("section");
  var turnCounter = 0;
  var colors;
  var playerColor;

  // Choose whos turn it is
  var decideTurn = function() {
    colors = ["red","black"];


    function moveCounter(){
      playerColor = colors[turnCounter];
      playerColor === "red" ? turnCounter++ : turnCounter--;
      console.log(playerColor);
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
        var cell = $(column[i]);

        if (cell.hasClass('')) {
          cell.addClass(playerColor);
          return;
        }
      }
    };

    function cellColorEventBind() {
      rows.on("click", decidePiecePlaced);
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
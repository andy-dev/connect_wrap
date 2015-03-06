// Pseudocode
//1. Board object
//  columns, rows


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
    turn === "red" ? i++ : i--;
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
    // return boardString;
    console.log(boardString); // Testing
  };

  // Choose What Color is placed

  var cellColorDeligation = function() {


    function decidePiecePlaced(){
      var column = $(this).children();

      for (var i=5; i >= 0; i--){
        // red is going to be color var later
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
    };

    cellColorEventBind();
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
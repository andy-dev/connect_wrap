// Pseudocode
//1. Board object
//  columns, rows


// Game Module
(function() {

  "use strict";

  var connectMore = new Firebase("https://luminous-inferno-9321.firebaseio.com");
  var rows = $("section");
  var turnCounter = 0;
  var colors;
  var playerColor;
  var boardString;
  var updatedBoard;

  // Choose whos turn it is
  var decideTurn = function() {
    colors = ["red","black"];


    function moveCounter(){
      playerColor = colors[turnCounter];
      playerColor === "red" ? turnCounter++ : turnCounter--;
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
          cell.hide();
          cell.fadeIn(2000)
          return;
        }
      }
    };

    function cellColorEventBind() {
      rows.on("click", decidePiecePlaced);
    };

    cellColorEventBind();
  };

  var renderFireBoard = function() {

    if (updatedBoard == null) return;

    updatedBoard = updatedBoard.split('')
    rows.each(function(index, row){
        for (var i=0; i < 47; i++){
          if (updatedBoard[i] == "r"){
            console.log($(row.children[i]).addClass("red"));
            // console.log(row.children)
          } else if (updatedBoard[i] == "b") {
            $(row.children[i]).addClass("black");
            console.log(row.children)
          }
        }
      })

  };


  // Create String that will be used to pick winner

  var createBoardString = function() {

    function updateString() {

      boardString = ""

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
      })
      return boardString
    };
    // boardString; // Testing
    function updateFirebase() {
      $("#boardstring").text(boardString);
      // connectMore.set({ board: boardString })
      connectMore.update({ board: boardString });
      connectMore.on("value", function(data) {
      updatedBoard = data.val().board;
      renderFireBoard;
      // console.log(boardString);// ? data.val().boardString : "";
      // console.log("My Board String " + boardString);
      });
    };


    function bindUpdateClick() {
      $(document).on('click', updateString)
      $(document).on('click', updateFirebase);
      $('button').on('click', renderFireBoard);
    };


    bindUpdateClick()
  };

  // var syncWithPlayer = function() {



  //   function bindSyncEvent() {
  //   $('button').on('click', renderFireBoard);

  //   }

  //   bindSyncEvent()
  // };


  var init = function() {
    cellColorDeligation();
    decideTurn();
    createBoardString();
    // syncWithPlayer();
  };

  window.gameModule = function() {
    return {
      init: init,
    }
  };

})()

var game = gameModule()
game.init()
// Pseudocode
//1. Board object
//  columns, rows


// Game Module
(function() {

  "use strict";

  var connectMore = new Firebase("https://luminous-inferno-9321.firebaseio.com");
  var rows = $("section");
  var turnCounter = 0;
  var boardString = "";
  var colors;
  var playerColor;
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

    moveCounter()
    bindCounterEvent();

  };

  // Choose What Color is placed

  var cellColorDeligation = function() {

    // function resetBoard() {
    //   updatedBoard = '';
    // };

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
      rows.on("click", createBoardString);
      // $('button').on('click', resetBoard);

    };

    cellColorEventBind();
  };

// RERENDER PRIORITY ONE WIP
  var renderFireBoard = function() {

    if (updatedBoard == null) return;

    if (typeof(updatedBoard) === 'string' ) {
      updatedBoard = updatedBoard.split('');
    }

      for (var col = 0; col < 42; col++) {
        if (rows.children()[col].id == col) {
          if (updatedBoard[col] === "r") {
            $(rows.children()[col]).addClass('red');
              console.log(rows.children()[col])
          } else if (updatedBoard[col] === "b") {
            $(rows.children()[col]).addClass('black');
          }
        // $(rows.children()[col]).addClass('red');
      // } else if (updatedBoard[col] === "b") {
        // $(rows.children()[col]).addClass('black');
        // break;
        }
      }
      // }

  };
// --------------------------------------------------

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
      renderFireBoard();
      // console.log(boardString);// ? data.val().boardString : "";
      // console.log("My Board String " + boardString);
      });
    };


    function bindUpdateClick() {
      $(document).on('click', updateString);
      $(document).on('click', updateFirebase);
      // $('#boardstring').on('click', renderFireBoard);
    };


    bindUpdateClick()
  };


  var checkBoardString = function(){

    var checkBlack = function(){
      var horizontal = /b.{5}b.{5}b.{5}b/;
      var vertical = /b{4}/;
      var horizontalCheck = horizontal.test(boardString);
      var verticalCheck = vertical.test(boardString);
      if (horizontalCheck == true || verticalCheck == true){
        alert ("Black player won!")
      };
    };

    var checkRed = function(){
      var horizontal = /r.{5}r.{5}r.{5}r/;
      var vertical = /r{4}/;
      var horizontalCheck = horizontal.test(boardString);
      var verticalCheck = vertical.test(boardString);
      if (horizontalCheck == true || verticalCheck == true){
        alert ("Red player won!")
      };
    };

    var checkDiagonalRed = function(){
      var pattern = /r.{4}r.{4}r.{4}r/;
      var pattern2 = /r.{6}r.{6}r.{6}r/;
      var check = pattern.test(boardString);
      var check2 = pattern2.test(boardString);
      if (check == true || check2 == true){
        alert ("Red player won!")
      };
    }

    var checkDiagonalBlack = function(){
      var pattern = /b.{4}b.{4}b.{4}b/;
      var pattern2 = /b.{6}b.{6}b.{6}b/;
      var check = pattern.test(boardString);
      var check2 = pattern2.test(boardString);
      if (check == true || check2 == true){
        alert ("Black player won!")
      };
    }

    function bindCheckEvents() {
      $(document).on("click", checkBlack);
      $(document).on("click", checkRed);
      $(document).on("click", checkDiagonalRed);
      $(document).on("click", checkDiagonalBlack);
    };

    bindCheckEvents();
  };


  var init = function() {
    cellColorDeligation();
    decideTurn();
    createBoardString();
    checkBoardString();
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


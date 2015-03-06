// Pseudocode
//1. Board object
//  columns, rows

var Board = function(){
  this.columns = 7;
  this.rows = 6;
};

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

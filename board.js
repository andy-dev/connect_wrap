// Pseudocode
//1. Board object
//  columns, rows

var Board = function(){
  this.columns = 7;
  this.rows = 6;
};

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
    if ((!$(column[i])).hasClass("red")){
      ($(column[i])).addClass("red");
    }

  }
})

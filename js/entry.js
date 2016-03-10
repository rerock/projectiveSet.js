var Game = require("./main/game");
var game = new Game();
var table = game.table;

$('#cards').click(function(e){
  if(e.target.id === 'cards'){
    return;
  }
  var cardIndex = parseInt(e.target.id.charAt(4));
  if(isNaN(cardIndex)){
    return;
  }
  $('#card'+cardIndex).toggleClass('select');
  table.deal[cardIndex] = !table.deal[cardIndex];
});

$('#cards').bind('click', function(){
  var res = game.xor(table);
  if(res === 0){
    table.dealCards();
    $('.card').removeClass('select');
  }
});

$('#newgame').click(function(){
  window.location.reload();
});

$('#solve').click(function(){
  var solve = game.solve(table);
  for (var i = 0; i < solve.length; i++) {
    table.deal[i] = solve[i];
    if (solve[i] === 1) {
      $('#card'+i).addClass('select');
    }
    else {
      $('#card'+i).removeClass('select');
    }
  }
});

$('#beginner').click(function() {
  game = new Game();
});

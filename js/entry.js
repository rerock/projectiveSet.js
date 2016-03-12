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
    game.increaseScore();
    $('.select').fadeOut(150).fadeIn(150).removeClass('select');
    setTimeout(function() {
      table.dealCards();
    }, 150)
    if (game.gameOver()) {
      document.body.innerHTML = "<h1 id='game-over'>YOU ROCK!</h1>";
    }
  }
});

$('#newgame').click(function(){
  window.location.reload();
});

$('#solve').click(function(){
  var solve = game.solve(table);
  for (var i = 0; i < solve.length; i++) {
    if (solve[i] === 1) {
      $('#card'+i).addClass('select');
      table.deal[i] = true;
    }
    else {
      $('#card'+i).removeClass('select');
      table.deal[i] = false;
    }
  }
});

$('#beginner').click(function() {
  game = new Game();
});

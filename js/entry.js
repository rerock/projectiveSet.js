var Game = require("./main/game");
var col_base = 6;
var game = new Game(col_base);
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
  var scoreCard = new Card(document.getElementsByTagName("canvas")[col_base+1], res, col_base);
  scoreCard.draw();
  if(res === 0){
    game.increaseScore();
    $('.select').fadeOut(150).fadeIn(150).removeClass('select');
    setTimeout(function() {
      table.dealCards(col_base);
    }, 150)
    if (game.gameOver()) {
      document.body.innerHTML = "<h1 id='game-over'>YOU ROCK!</h1>";
    }
  }
});

$('#newgame').click(function(){
  window.location.reload();
});

$('#clear').click(function(){
  $('.select').removeClass('select');
  var scoreCard = new Card(document.getElementsByTagName("canvas")[col_base+1], 0, col_base);
  scoreCard.draw();
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
  var res = game.xor(table);
  var scoreCard = new Card(document.getElementsByTagName("canvas")[col_base+1], res, col_base);
  scoreCard.draw();
});

$('#beginner').click(function() {
  col_base = 3;
  _regenerateGame(col_base);
});

$('#intermediate').click(function() {
  col_base = 4;
  _regenerateGame(col_base);
});

$('#advance').click(function() {
  col_base = 5;
  _regenerateGame(col_base);
});

$('#hard').click(function() {
  col_base = 6;
  _regenerateGame(col_base);
});

_regenerateGame = function(col_base){
  $('.card').remove();
  $('.card_back').remove();
  var cards = document.getElementById("cards");
  var card;
  for (var i = 0; i < col_base+1; i++) {
    card = document.createElement("canvas");
    card.className = 'card';
    card.id = 'card'+i;
    cards.appendChild(card);
  }
  game = new Game(col_base);
  $('#score').text("Score: " +game.score);
  table = game.table;
}

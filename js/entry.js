var Game = require("./main/game");
var col_base = 6;
var game = new Game(col_base);
$('#toolbar').show();
$('.active').removeClass('active');
$('#hard').addClass('active');
$('#game-over').remove();
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
  var scoreCard = new Card(document.getElementsByTagName("canvas")[0], res, col_base);
  scoreCard.draw();
  if(res === 0){
    game.increaseScore();
    $('.select').fadeOut(150).fadeIn(150).removeClass('select');
    setTimeout(function() {
      table.dealCards(col_base);
    }, 150)
    if (game.gameOver()) {
      $('.card').remove();
      $('#toolbar').hide();
      var section = document.getElementById("main");
      var win = document.createElement("div");
      win.innerHTML = "<h1 id='game-over'>YOU ROCK!</h1>";
      section.appendChild(win);
    }
  }
});

$('#clear').click(function(){
  $('.select').removeClass('select');
  var scoreCard = new Card(document.getElementsByTagName("canvas")[0], 0, col_base);
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
  var scoreCard = new Card(document.getElementsByTagName("canvas")[0], res, col_base);
  scoreCard.draw();
});

$('#beginner').click(function() {
  $('#toolbar').show();
  $('.be_formular').remove();
  $('.af_formular').remove();
  $(".math").removeClass("formular");
  $('.active').removeClass('active');
  $('#beginner').addClass('active');
  $('#game-over').remove();
  col_base = 3;
  _regenerateGame(col_base);
});

$('#intermediate').click(function() {
  $('#toolbar').show();
  $('.be_formular').remove();
  $('.af_formular').remove();
  $(".math").removeClass("formular");
  $('.active').removeClass('active');
  $('#intermediate').addClass('active');
  $('#game-over').remove();
  col_base = 4;
  _regenerateGame(col_base);
});

$('#advance').click(function() {
  $('#toolbar').show();
  $('.active').removeClass('active');
  $('#advance').addClass('active');
  $('.be_formular').remove();
  $('.af_formular').remove();
  $(".math").removeClass("formular");
  $('#game-over').remove();
  col_base = 5;
  _regenerateGame(col_base);
});

$('#hard').click(function() {
  $('#toolbar').show();
  $('.active').removeClass('active');
  $('#hard').addClass('active');
  $('.be_formular').remove();
  $('.af_formular').remove();
  $(".math").removeClass("formular");
  $('#game-over').remove();
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

$('#about').click(function(){
  $('.card_back').remove();
  $('.card').remove();
  $('.be_formular').remove();
  $('.af_formular').remove();
  $('#toolbar').hide();
  $("<div></div>").addClass("be_formular").prependTo('.description');
  // $('.description').remove();
  // $("<div></div>").addClass("description").appendTo('#title');
  $(".be_formular").append("<h1>In the game of projective set, a card has n binary attributes, or bits, represented by colored dots. For each color of dot, each card either has that dot or does not. There is one card for each possible combination of dots except the combination of no dots at all, making 2<sup>n-1</sup>cards total. The objective is to find a set of cards that has an even number of every color dot.  Equivalently, a linearly dependent collection of cards. Equivalently, the XOR operation of all cards in a set leaves no dots visible. </h1>");
  $(".be_formular").append("<h2>Idea:</h2>");
  $(".be_formular").append("<h3>In a vector space of dimension N, any N+1 vectors are linearly dependant.</h3>");
  $(".be_formular").append("<h1>The 2<sup>n-1</sup> number of cards can be represented as the nonzero vectors in the N-dimensional vector space (V) over the 2-element field 𝔽<sub>2</sub>: The N coordinates correspond to the N colors. If a color is present on a card, the corresponding entry is 1 and otherwise 0.</h1>");
  $(".be_formular").append("<h1>Under this correspondence, a set is a collection of vectors whose sum is the zero vector. Since the dimension of the vector space is N, any set of N+1 vectors v<sub>1</sub>,v<sub>2</sub>,..., v<sub>n+1</sub> must be linearly dependent, i.e. there exist constants c<sub>i</sub>∈𝔽<sub>2</sub>, not all zero, such that</h1>");
  $(".math").addClass("formular");
  $("<div></div>").addClass("af_formular").appendTo('.description');
  $(".af_formular").append("<h1>Since the c<sub>i</sub>'s all either 0 or 1, so this is equivalent to some subset of the v<sub>i</sub>'s must sum to the zero vector. Therefore, any N+1 cards contain a set.</h1>");
});

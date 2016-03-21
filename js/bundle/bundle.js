/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/bundle/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
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
	  $('.active').removeClass('active');
	  $('#beginner').addClass('active');
	  col_base = 3;
	  _regenerateGame(col_base);
	});
	
	$('#intermediate').click(function() {
	  $('.active').removeClass('active');
	  $('#intermediate').addClass('active');
	  col_base = 4;
	  _regenerateGame(col_base);
	});
	
	$('#advance').click(function() {
	  $('.active').removeClass('active');
	  $('#advance').addClass('active');
	  col_base = 5;
	  _regenerateGame(col_base);
	});
	
	$('#hard').click(function() {
	  $('.active').removeClass('active');
	  $('#hard').addClass('active');
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Table = __webpack_require__(2);
	
	Game = function(col_base){
	  this.col_base = col_base
	  this.table = new Table(this.col_base);
	  this.score = 0;
	};
	
	Game.prototype.xor = function(table) {
	  return _xor(table.deal, table);
	};
	
	Game.prototype.gameOver = function(){
	  return this.table.deck.deck.length === 0;
	};
	
	Game.prototype.solve = function(table) {
	  var selectedArray;
	  for(var i = 1; i <= Math.pow(2,this.col_base+1); i++){
	    selectedArray = _selectedArray(i, this.col_base+1);
	    if (_xor(selectedArray, table) === 0){
	      return selectedArray;
	    }
	  }
	};
	
	Game.prototype.increaseScore = function(){
	  for (var i = 0; i < this.table.deal.length; i++) {
	    if (this.table.deal[i]) {
	      this.score ++;
	    }
	  }
	  $('#score').text("Score: " +this.score);
	};
	
	_xor = function(selected, table){
	  var result = 0;
	  for (var i = 0; i < selected.length; i++) {
	    if (selected[i]) {
	      result ^= table.items[i].number;
	    }
	  }
	  return result;
	}
	
	_selectedArray = function(num, col_base){
	  var result = [];
	  for(var i = 0; i<col_base+1; i++){
	    result.push(num % 2);
	    num = Math.floor(num / 2);
	  }
	  return result;
	}
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Card = __webpack_require__(3);
	var Deck = __webpack_require__(4);
	
	Table = function(col_base){
	  this.deck = new Deck(col_base);
	  this.deck.shuffle();
	  this.items = new Array(col_base+1);
	  this.canvas = new Array(col_base+1);
	  this.deal = new Array(col_base+1);
	  for (var i = 0; i < col_base+1; i++) {
	    $("#card"+i).removeClass('select');
	    this.canvas[i] = document.getElementsByTagName("canvas")[i];
	    this.items[i] = new Card(this.canvas[i], this.deck.draw(),col_base);
	    this.items[i].draw();
	    this.deal[i] = false;
	  }
	  var canvas = document.getElementsByTagName("canvas")[col_base+1];
	  var scoreCard = new Card(canvas, 0, col_base);
	  scoreCard.draw();
	};
	
	Table.prototype.dealCards = function(col_base){
	  for(var i = 0; i < col_base+1; i++) {
	    if(this.deal[i]){
	      this.items[i] = new Card(this.canvas[i], this.deck.draw(), col_base);
	      this.items[i].draw();
	      this.deal[i] = false;
	    }
	  }
	};
	
	module.exports = Table;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var color = [ 'red', 'blue', 'green', 'orange', 'purple', 'yellow'];
	
	Card = function(canvas, number, col_base){
	  this.canvas = canvas;
	  this.ctx = canvas.getContext('2d');
	  canvas.width = 110;
	  canvas.height = 170;
	  this.cw = canvas.width;
	  this.ch = canvas.height;
	  this.number = number;
	  this.circle = new Array(col_base);
	  this.col_base = col_base;
	  var y_len = (col_base === 3 || col_base === 4) ? 4 : 6;
	  for (var i = 0; i < col_base; i++) {
	    this.circle[i] = {};
	    this.circle[i].color = color[i];
	    if (i % 2) {
	      this.circle[i].x = this.cw*3/4;
	      this.circle[i].y = this.ch*i/y_len;
	    } else {
	      this.circle[i].x = this.cw/4;
	      this.circle[i].y = this.ch*(i+1)/y_len;
	    }
	  }
	};
	
	Card.prototype.draw = function(){
	  this.ctx.fillStyle = "rgba(0,0,0,0)";
	  this.ctx.fillRect(0, 0, this.cw, this.ch);
	  var i;
	  for(var pos = 0; pos < this.col_base; pos++){
	    i = Math.pow(2, pos);
	    if((this.number & i) !== 0){
	      this.drawColor(pos);
	    }
	  }
	};
	
	Card.prototype.drawColor = function(n){
	  this.ctx.beginPath();
	  this.ctx.fillStyle = this.circle[n]['color'];
	  this.ctx.arc(this.circle[n]['x'], this.circle[n]['y'],this.cw/4 - 10, 0, Math.PI * 2 );
	  this.ctx.fill();
	}
	
	
	module.exports = Card;


/***/ },
/* 4 */
/***/ function(module, exports) {

	Deck = function(col_base){
	  this.deck = Array.apply(null, {length: Math.pow(2,col_base)}).map(Number.call, Number).splice(1);
	  var deck = document.getElementById("deck");
	  var card;
	  for (var i = 0; i < this.deck.length; i++) {
	    card = document.createElement("div");
	    card.className = 'card_back';
	    deck.appendChild(card);
	  }
	};
	
	Deck.prototype.shuffle = function(){
	  var i = 0, j = 0, temp = null;
	  for (i = this.deck.length - 1; i > 0; i -= 1) {
	    j = Math.floor(Math.random() * (i + 1));
	    temp = this.deck[i];
	    this.deck[i] = this.deck[j];
	    this.deck[j] = temp;
	  }
	};
	
	
	Deck.prototype.draw = function(){
	  if (this.deck.length) {
	    $('div#deck > div:first').remove();
	    return this.deck.shift();
	  }
	  return this.deck.length ? this.deck.shift() : 0;
	};
	
	module.exports = Deck;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
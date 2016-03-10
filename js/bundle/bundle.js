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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Table = __webpack_require__(4);
	
	Game = function(){
	  this.table = new Table();
	};
	
	Game.prototype.xor = function(table) {
	  // console.log(this.solve(table));
	  return _xor(table.deal, table);
	};
	
	Game.prototype.gameOver = function(){
	  return this.table.deck.deck.length === 0;
	};
	
	Game.prototype.solve = function(table) {
	  var selectedArray;
	  for(var i = 1; i<=Math.pow(2,7); i++){
	    selectedArray = _selectedArray(i);
	    if (_xor(selectedArray, table) === 0){
	      return selectedArray;
	    }
	  }
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
	
	_selectedArray = function(num){
	  var result = [];
	  for(var i = 0; i<7; i++){
	    result.push(num % 2);
	    num = Math.floor(num / 2);
	  }
	  return result;
	}
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var color = [ 'red', 'blue', 'green', 'orange', 'purple', 'yellow'];
	
	Card = function(canvas, number){
	  this.canvas = canvas;
	  this.ctx = canvas.getContext('2d');
	  canvas.width = 110;
	  canvas.height = 170;
	  this.cw = canvas.width;
	  this.ch = canvas.height;
	  this.number = number;
	  this.circle = new Array(6);
	  this.circle[0] = {x: this.cw/4, y: this.ch/6, color: color[0]};
	  this.circle[1] = {x: this.cw*3/4, y: this.ch/6, color: color[1]};
	  this.circle[2] = {x: this.cw/4, y: this.ch/2, color: color[2]};
	  this.circle[3] = {x: this.cw*3/4, y: this.ch/2, color: color[3]};
	  this.circle[4] = {x: this.cw/4, y: this.ch*5/6, color: color[4]};
	  this.circle[5] = {x: this.cw*3/4, y: this.ch*5/6, color: color[5]};
	};
	
	Card.prototype.draw = function(){
	  this.ctx.fillStyle = "rgba(0,0,0,0)";
	  this.ctx.fillRect(0, 0, this.cw, this.ch);
	  var i;
	  for(var pos = 0; pos < 6 ; pos++){
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
/* 3 */
/***/ function(module, exports) {

	Deck = function(){
	  this.deck = Array.apply(null, {length: 64}).map(Number.call, Number).splice(1);
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
	  return this.deck.length ? this.deck.shift() : 0;
	};
	
	module.exports = Deck;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Card = __webpack_require__(2);
	var Deck = __webpack_require__(3);
	
	Table = function(){
	  this.deck = new Deck();
	  this.deck.shuffle();
	  this.items = new Array(7);
	  this.canvas = new Array(7);
	  this.deal = new Array(7);
	  for (var i = 0; i < 7; i++) {
	    $("#card"+i).removeClass('select');
	    this.canvas[i] = document.getElementsByTagName("canvas")[i];
	    this.items[i] = new Card(this.canvas[i], this.deck.draw());
	    this.items[i].draw();
	    this.deal[i] = false;
	  }
	};
	
	Table.prototype.dealCards = function(){
	  for(var i = 0; i < 7; i++) {
	    if(this.deal[i]){
	      this.items[i] = new Card(this.canvas[i], this.deck.draw());
	      this.items[i].draw();
	      this.deal[i] = false;
	    }
	  }
	};
	
	module.exports = Table;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
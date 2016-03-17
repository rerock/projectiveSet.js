var Table = require("./table");

Game = function(){
  this.table = new Table();
  this.score = 0;
};

Game.prototype.xor = function(table) {
  // console.log(_xor(table.deal, table));
  return _xor(table.deal, table);
};

Game.prototype.gameOver = function(){
  return this.table.deck.deck.length === 0;
};

Game.prototype.solve = function(table) {
  var selectedArray;
  for(var i = 1; i <= Math.pow(2,7); i++){
    selectedArray = _selectedArray(i);
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

_selectedArray = function(num){
  var result = [];
  for(var i = 0; i<7; i++){
    result.push(num % 2);
    num = Math.floor(num / 2);
  }
  return result;
}

module.exports = Game;

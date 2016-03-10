var Table = require("./table");

Game = function(){
  this.table = new Table();
};

Game.prototype.xor = function(table) {
  // console.log(this.solve(table));
  return _xor(table.deal, table);

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

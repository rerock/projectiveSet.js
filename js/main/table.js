var Card = require("./card");
var Deck = require("./deck");

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

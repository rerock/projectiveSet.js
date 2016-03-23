var Card = require("./card");
var Deck = require("./deck");

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

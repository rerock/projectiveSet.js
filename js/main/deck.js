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

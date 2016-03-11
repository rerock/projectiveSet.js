Deck = function(){
  this.deck = Array.apply(null, {length: 64}).map(Number.call, Number).splice(1);
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

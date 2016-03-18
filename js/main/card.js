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

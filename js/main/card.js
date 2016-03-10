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

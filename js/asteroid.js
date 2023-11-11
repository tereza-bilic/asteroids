export default class Asterod {
  constructor(game) {
    this.game = game;
    // make size one or two
    this.size = Math.floor(Math.random() * 2) + 1;

    this.width = this.size === 1 ? 100 : 65;
    this.height = this.size === 1 ? 100 : 65;

    // position and generate random vectors for movement just off screen poining inwards
    const side = Math.floor(Math.random() * 4);
    switch(side) {
      case 0: // TOP
        this.x = Math.floor(Math.random() * this.game.width);
        this.y = -this.height;
        this.dx = Math.random() * 2 - 1;
        this.dy = Math.random() * 2;
        break;
      case 1: // RIGHT
        this.x = this.game.width + this.width;
        this.y = Math.floor(Math.random() * this.game.height);
        this.dx = Math.random() * -2;
        this.dy = Math.random() * 2 - 1;
        break;
      case 2: // BOTTOM
        this.x = Math.floor(Math.random() * this.game.width);
        this.y = this.game.height + this.height;
        this.dx = Math.random() * 2 - 1;
        this.dy = Math.random() * -2;
        break;
      case 3: // LEFT
        this.x = -this.width;
        this.y = Math.floor(Math.random() * this.game.height);
        this.dx = Math.random() * 2;
        this.dy = Math.random() * 2 - 1;
        break;
    }


    this.image = this.size === 1 ? document.getElementById('asteroid2') : document.getElementById('asteroid');
    this.speed = Math.random() * 2 + 0.5;
  }

  get isOutOfBounds() {
    return (
      this.x > this.game.width ||
      this.x + this.width < 0 ||
      this.y > this.game.height ||
      this.y + this.height < 0
    )
  }

  update() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  }

  draw(context) {
    // rotate randomly
    context.save()
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'black';
    context.shadowBlur = 80;
    context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    context.restore()
  }
}

export default class Asterod {
  constructor(game) {
    this.game = game;
    this.width = 96;
    this.height = 96;
    // random x and y
    this.x = Math.random() * game.width;
    this.y = Math.random() * game.height;
    this.image = document.getElementById('asteroid');
    this.speed = 1;
  }

  update() {
    this.x += this.speed;
    this.y += this.speed;
  }

  draw(context) {
    // rotate randomly
    context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }
}

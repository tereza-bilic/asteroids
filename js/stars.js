export default class Stars {
  constructor(game) {
  this.w = 1;
  this.h = 40;
  this.x = Math.floor(Math.random() * game.width);
  this.y = Math.floor(Math.random() * game.height);
  this.fall_speed = 15;
  this.game = game;
  }

  draw(context) {
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.w, this.h);
  }

  update() {
      this.y += this.fall_speed;

      if (this.y >= screen.height) {
          this.y = -this.h;
          this.x = Math.floor(Math.random() * screen.width);
      }
  }
}

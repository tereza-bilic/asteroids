export default class Ship {
  constructor(game) {
    this.game = game;
    this.width = 48;
    this.height = 48;
    this.x = game.width / 2 - this.width / 2;
    this.y = game.height / 2 - this.height / 2;
    this.image = document.getElementById('ship');
  }

  update(input) {
    if (input.includes('ArrowDown')) {
      this.y += 5;
    }

    if (input.includes('ArrowUp')) {
      this.y -= 5;
    }

    if (input.includes('ArrowLeft')) {
      this.x -= 5;
    }

    if (input.includes('ArrowRight')) {
      this.x += 5;
    }

    this.handleOutOfBounds();
  }


  handleOutOfBounds() {
    // if out of bounds, show up on other side
    if (this.x >= this.game.width) { // RIGHT
      this.x -= this.game.width;
    }

    if (this.x <= 0) { // LEFT
      this.x += this.game.width;
    }

    if (this.y >= this.game.height){ // DOWN
      this.y -= this.game.height;
    }

    if (this.y <= 0) { // UP
      this.y += this.game.height;
    }
  }


  draw(context) {
    context.save()
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'black';
    context.shadowBlur = 60;
    context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    context.restore()
  }

  collide(asteroid) {
    return (
      this.x < asteroid.x + asteroid.width &&
      this.x + this.width > asteroid.x &&
      this.y < asteroid.y + asteroid.height &&
      this.y + this.height > asteroid.y
    );
  }

  explode() {
    this.game.stop()
  }
}

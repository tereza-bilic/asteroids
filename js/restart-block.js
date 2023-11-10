export default class RestartBlock {
  constructor(game, time) {
    this.game = game;
    this.time = time;
    this.width = 200;
    this.height = 100;
    this.x = game.width / 2 - this.width / 2;
    this.y = game.height / 2 - this.height / 2;
  }

  draw(context) {
    context.fillStyle = 'white';
    context.font = "30px Arial";
    context.fillText('Game Over', this.x, this.y);
    context.font = "20px Arial";
    context.fillText('Score: ' + this.time, this.x, this.y + 30);
    context.fillText('Press any arrow to restart', this.x, this.y + 50);
  }

  update(inputs) {
    if (inputs.length > 0) {
      this.game.restart();
    }
  }
}

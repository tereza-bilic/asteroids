export default class HighScore {
  constructor(game) {
    this.game = game;
    this.highScore = Number(localStorage.getItem('highScore')) || 0;
  }

  draw(context) {
    context.font = "20px Arial";
    const minutes = Math.floor(this.highScore / 60);
    const seconds = Math.floor(this.highScore % 60);
    const tens = Math.floor((this.highScore % 1) * 100);
    context.fillText(`High Score: ${minutes}:${seconds}:${tens}`, this.game.width - 190, 25);
  }

  update(time) {
    if (time > this.highScore) {
      this.highScore = time;
      localStorage.setItem('highScore', this.highScore);
    }
  }
}

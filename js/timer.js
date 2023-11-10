export default class Timer {
  constructor(game) {
    this.tens = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.interval;
    this.game = game;
    console.log(this.tens,this.seconds)
  }

  get isRunning() {
    return Boolean(this.interval)
  }

  start() {
    clearInterval(this.interval)
    this.interval = setInterval(() => this.startTimer(), 10)
  }

  stop() {
    const time = (this.minutes * 60) + this.seconds + (this.tens / 100)

    clearInterval(this.interval)
    this.seconds = 0
    this.minutes = 0
    this.tens = 0

    return time
  }

  startTimer() {
    if (!this.tens) {
      this.tens = 0
    }

    this.tens += 1

    if (this.tens > 100) {
      this.seconds += 1
      this.tens = 0
    }

    if (this.seconds > 60) {
      this.minutes += 1
      this.seconds = 0
    }
  }

  draw(context) {
    context.font = "20px Arial";
    context.fillText(`${this.minutes}:${this.seconds}:${this.tens}`, this.game.width - 80, 50);
  }
}

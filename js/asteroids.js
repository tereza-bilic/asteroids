import Ship from './ship.js';
import InputHandler from './input.js';
import { generateAsteroids } from './asteroid-generator.js';
import Stars from './stars.js';
import Timer from './timer.js'
import RestartBlock from './restart-block.js';
import Highscore from './highscore.js';

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.asteroids = [];
      this.inputHandler = new InputHandler();
      this.numberOfAsteroids = 6;
      this.frequencyOfAsteroids = 1000;
      this.restartBlock = null;
      this.highscore = new Highscore(this);

      this.stars = [];
      for (let i = 0; i < 100; i++) {
        this.stars.push(new Stars(this));
      }

      this.ship = new Ship(this);
      this.asteroids = generateAsteroids(this, this.numberOfAsteroids);
      this.timer = new Timer(this);
      this.timer.start()
    }

    get isPaused() {
      return Boolean(this.restartBlock)
    }

    update() {
      if (this.isPaused) {
        this.restartBlock.update(this.inputHandler.keys)
        return;
      }

      this.ship.update(this.inputHandler.keys);
      this.asteroids.forEach(asteroid => asteroid.update());
      this.stars.forEach(star => star.update());
      this.highscore.update(this.timer.time);

      // add asteroids
      if (this.asteroids.filter(asteroid => !asteroid.isOutOfBounds).length < this.numberOfAsteroids) {
        this.asteroids = this.asteroids.concat(generateAsteroids(this, 1));
      }

      this.asteroids.forEach(asteroid => {
        if (this.ship?.collide(asteroid)) {
          this.ship.explode();
        }
      });
    }

    draw(context) {
      if (this.isPaused) {
        this.restartBlock.draw(context)
        return;
      }

      this.ship.draw(context);
      this.asteroids.forEach(asteroid => asteroid.draw(context));
      this.stars.forEach(star => star.draw(context));
      this.timer.draw(context);
      this.highscore.draw(context);
    }

    stop() {
      const time = this.timer.stop()
      this.restartBlock = new RestartBlock(this, time)
      delete this.asteroids
      delete this.ship
      this.inputHandler.keys = []


      console.log(time, localStorage.getItem('highscore'))

      if (time > localStorage.getItem('highscore') || !localStorage.getItem('highscore')) {
        localStorage.setItem('highscore', time)
      }
    }

    restart() {
      this.ship = new Ship(game)
      this.asteroids = generateAsteroids(this, this.numberOfAsteroids)
      this.timer.start();
      this.restartBlock = null;
    }
  }

  const game = new Game(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate();
});


import Ship from './ship.js';
import InputHandler from './input.js';
import { generateAsteroids } from './asteroid-generator.js';
import Stars from './stars.js';
import Timer from './timer.js'

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
      this.numberOfAsteroids = 10;
      this.frequencyOfAsteroids = 1000;

      this.stars = [];
      for (let i = 0; i < 100; i++) {
        this.stars.push(new Stars(this));
      }

      this.ship = new Ship(this);
      this.asteroids = generateAsteroids(this, this.numberOfAsteroids);
      this.timer = new Timer(this);
      this.timer.start()
    }

    update() {
      this.ship.update(this.inputHandler.keys);
      this.asteroids.forEach(asteroid => asteroid.update());
      this.stars.forEach(star => star.update());

      if (this.asteroids.length < this.numberOfAsteroids) {
        this.asteroids = generateAsteroids(this, this.numberOfAsteroids);
      }

      this.asteroids.forEach(asteroid => {
        if (this.ship.collide(asteroid)) {
          this.ship.explode();
        }
      });
    }

    draw(context) {
      this.ship.draw(context);
      this.asteroids.forEach(asteroid => asteroid.draw(context));
      this.stars.forEach(star => star.draw(context));
      this.timer.draw(context);
    }

    stop() {
      this.asteroids = []
      const time = this.timer.stop()
      delete this.ship
      this.ship = new Ship(this);
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


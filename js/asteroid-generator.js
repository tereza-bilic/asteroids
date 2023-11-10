import Asteroid from "./asteroid.js";

export function generateAsteroids(game, numberOfAsteroids) {
  const asteroids = [];

  for (let i = 0; i < numberOfAsteroids; i++) {
    asteroids.push(new Asteroid(game));
  }

  return asteroids;
}

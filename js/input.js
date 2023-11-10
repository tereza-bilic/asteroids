const LISTENED_KEYS = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

export default class InputHandler {
  constructor() {
    this.keys = [];

    window.addEventListener('keydown', (e) => {
      if (LISTENED_KEYS.includes(e.key)) {
        this.keys.push(e.key);
      }
      console.log(this.keys);
    });

    window.addEventListener('keyup', (e) => {
      if (LISTENED_KEYS.includes(e.key)) {
        this.keys = this.keys.filter(key => key !== e.key);
      }

      console.log(this.keys);
    });
  }
}

"use strict";

class Renderer {
  constructor(element) {
    this.element = element;
    this.setup();
  }

  setup() {
    let box = document.createElement("div");
    box.style.position = "absolute";
    box.style.top = "20px";
    box.style.left = "20px";
    box.style.backgroundColor = "red";
    box.style.width = "20px";
    box.style.height = "20px";

    this.element.appendChild(box);
    this.box = box;
  }

  render(position) {
    this.box.style.top = position + "px";
  }
}

class Box {
  constructor() {
    this.position = 0;

    /*
     * Negativer Speed: nach oben
     * positiver Speed: nach unten
     * */
    this.speed = 0;
  }

  gameLoop() {
    this.speed++;
    this.position = this.position + this.speed;
  }
  moveUp() {
    this.speed = -15;
  }
}

class Game {
  constructor(element) {
    this.renderer = new Renderer(element);
    this.box = new Box();
    this.element = element;
    this.isRunning = true;
    this.setup();
  }

  setup() {
    this.element.addEventListener(
      "click",
      () => {
        this.box.moveUp();
      },
      false
    );
  }

  start() {
    let counter = 0;
    let timer = setInterval(() => {
      counter++;
      this.box.gameLoop();
      if (this.box.position < 0) {
        this.isRunning = false;
        clearInterval(timer);
        alert("Gameover: You are trash " + counter + " Punkte");
      }
      if (this.box.position + 20 > this.element.clientHeight) {
        this.isRunning = false;
        clearInterval(timer);
        alert("Gameover: You are shit " + counter + " Punkte");
      }
      if (this.isRunning == true) {
        this.renderer.render(this.box.position);
      }
    }, 50);
    console.log(timer);
  }
}

let game = new Game(document.getElementById("game"));
game.start();

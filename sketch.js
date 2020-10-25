const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
let spritesheet;
let spritedata;

let animation = [];

let ufos = [];

function preload() {
  const shipSpritesheet = loadSpriteSheet("alien/SpaceShip.png", 32, 32, 12);
  shipAnim = loadAnimation(shipSpritesheet);
  ship = createSprite(CANVAS_WIDTH / 2, CANVAS_HEIGHT- 50, 32, 32);
  ship.moveSpeed = 5;
  ship.scale = (2.0)
  
  spritedata = loadJSON('alien/ufo.json');
  spritesheet = loadImage('alien/Aliens clone copy.png');
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  ship.addAnimation("move", shipAnim);
  ship.addImage("still", loadImage("alien/ship_still.png"));
  ship.setDefaultCollider();

  let frames = spritedata.frames;
  for (let i = 0; i < frames.length; i++) {
    let pos = frames[i].position;
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
  }

  for (let i = 0; i < 3; i++) {
    ufos[i] = new Sprite(animation, 0, i * 75, 0.1, 0.4);
  }
}

function update(object) {
  if (keyDown("up") || keyDown("down") || keyDown("left") || keyDown("right")) {
    if (keyDown("up")) {
      object.addSpeed(2, 270);
    }
    if (keyDown("down")) {
      object.addSpeed(2, 90);
    }
    if (keyDown("left")) {
      object.addSpeed(2, 180);
      object.mirrorX(-1);
    }
    if (keyDown("right")) {
      object.addSpeed(2, 0);
      object.mirrorX(1);
    }
  } else {
    object.setSpeed(0);
  }
  drawObject(object);
}

function drawObject(object) {
  if (object.getSpeed() > 0.0001) {
    object.changeAnimation("move");
  } else {
    object.changeImage("still");
  }
  ship.limitSpeed(ship.moveSpeed);
  drawSprite(object);
}


function draw() {
  background(0);
  update(ship);

  for (let ufo of ufos) {
    ufo.show();
    ufo.animate();
  }

  // image(animation[frameCount % animation.length], 0, 0);
}

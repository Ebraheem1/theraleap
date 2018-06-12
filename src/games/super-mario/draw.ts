declare const __path__: string;

//images
var bg: any;
var obstacle: any;
var gift: any;
var player: any;
var obstacle2: any;
var raisehand: any[] = [];

var raisehandframe = 0;
var raisehandlastframe = 0;

//Coordinates Values
export var obs2X: number = 0;
export var obs2Y: number = 0;
export var giftX: number = 0;
export var giftY: number = 0;
export var flowerX: number = 0;
export var flowerY: number = 0;
export var giftTaken: boolean = false;
export var steelTaken: boolean = false;
export var flowerTaken: boolean = false;

//Bezier Curve for the obstacle
var obs0: number[] = [];
var obs1: number[] = [];
var obs2: number[] = [];
var obs3: number[] = [];
export var obs2Inc: number = 0;

export const initializeData = (width: number, height: number) => {
  obs0 = [width, 0.23 * height];
  obs1 = [0.07 * width, 0.67 * height];
  obs2 = [0.83 * width, 1.06 * height];
  obs3 = [-0.04 * width, 0.18 * height];

  obs2Inc = 0;

  obs2X = width + 40;
  obs2Y = 0.23 * height;

  giftX = width + 60;
  giftY = 0.167 * height;

  flowerX = width + 60;
  flowerY = 0.67 * height;
};

export const loadImages = (ctx: p5) => {
  player = ctx.loadImage(`${__path__}images/super-mario/mario.png`);
  bg = ctx.loadImage(`${__path__}images/super-mario/back-ground.jpg`);
  gift = ctx.loadImage(`${__path__}images/super-mario/power-up.png`);
  obstacle = ctx.loadImage(`${__path__}images/super-mario/obstacle.png`);
  obstacle2 = ctx.loadImage(`${__path__}images/super-mario/obstacle2.png`);
  for (var i = 0; i < 24; i++) {
    var tmp = ctx.loadImage(
      `${__path__}images/super-mario/raisehand/frame_` +
        ctx.nf(i, 2) +
        `_delay-0.1s.png`
    );
    raisehand.push(tmp);
  }
};

export const drawBackground = (width: number, height: number, ctx: p5) => {
  ctx.imageMode(ctx.CORNER);
  ctx.image(bg, 0, 0, width, height);
};

export const drawMario = (marioX: number, marioY: number, ctx: p5) => {
  ctx.imageMode(ctx.CENTER);
  ctx.image(player, marioX, marioY);
};

export const drawAnim = (
  width: number,
  height: number,
  message: string,
  ctx: p5
) => {
  if (message == "Raise") {
    raisehandframe = (raisehandframe + 1) % raisehand.length;
    ctx.imageMode(ctx.CENTER);
    var img = raisehand[raisehandframe];
    ctx.image(img, 0.5 * width, 0.5 * height);

    if (raisehandframe == 23 && raisehandlastframe < 20) {
      raisehandframe = 22;
      raisehandlastframe++;
    } else {
      raisehandlastframe = 0;
    }

    var color = ctx.color(0, 0, 0);
    var fontSize = 25;
    ctx.fill(color);
    ctx.textSize(fontSize);
    ctx.text(
      "Please, Raise your hand a bit more!",
      0.025 * width,
      0.178 * height
    );
  } else if (message == "No Hand") {
    var color = ctx.color(0, 0, 0);
    var fontSize = 25;
    ctx.fill(color);
    ctx.textSize(fontSize);
    ctx.text("No Hand Detected", 0.025 * width, 0.178 * height);
  } else if (message == "Wrong Hand") {
    var color = ctx.color(0, 0, 0);
    var fontSize = 25;
    ctx.fill(color);
    ctx.textSize(fontSize);
    ctx.text(
      "Wrong Hand Type, Please play with the other hand",
      0.025 * width,
      0.178 * height
    );
  }
};

export const checkHeart = (width: number, height: number, ctx: p5) => {
  ctx.imageMode(ctx.CENTER);
  giftX -= 2;

  if (giftX <= -0.044 * width) {
    giftX = width + 60;
    if (giftY == 0.167 * height) giftY = 0.89 * height;
    else giftY = 0.167 * height;
    giftTaken = false;
  }

  if (!giftTaken) ctx.image(gift, giftX, giftY);
};

export const checkFlower = (width: number, height: number, ctx: p5) => {
  ctx.imageMode(ctx.CENTER);
  flowerX -= 2;

  if (flowerX <= -0.044 * width) {
    flowerX = width + 60;
    if (flowerY == 0.67 * height) flowerY = 0.22 * height;
    else flowerY = 0.67 * height;
    flowerTaken = false;
  }

  if (!flowerTaken) ctx.image(obstacle, flowerX, flowerY);
};

export const doBezier = () => {
  if (obs2Inc < 1) {
    obs2X =
      Math.pow(1 - obs2Inc, 3) * obs0[0] +
      3 * obs2Inc * Math.pow(1 - obs2Inc, 2) * obs1[0] +
      3 * Math.pow(obs2Inc, 2) * (1 - obs2Inc) * obs2[0] +
      Math.pow(obs2Inc, 3) * obs3[0];
    obs2Y =
      Math.pow(1 - obs2Inc, 3) * obs0[1] +
      3 * obs2Inc * Math.pow(1 - obs2Inc, 2) * obs1[1] +
      3 * Math.pow(obs2Inc, 2) * (1 - obs2Inc) * obs2[1] +
      Math.pow(obs2Inc, 3) * obs3[1];
    obs2Inc += 0.003;
  } else {
    obs2Inc = 0;
    steelTaken = false;
  }
};

export const drawSteel = (ctx: p5) => {
  ctx.imageMode(ctx.CENTER);
  if (!steelTaken) ctx.image(obstacle2, obs2X, obs2Y);
};

export const enableGiftTaken = () => {
  giftTaken = true;
};

export const enableFlowerTaken = () => {
  flowerTaken = true;
};

export const enablSteelTaken = () => {
  steelTaken = true;
};

declare const __path__: string;
//Variables related to the images in the game
export var pReg: any = 0;
export var redLaser: any = 0;
export var eI: any = 0;
export var mouseC: any = 0;

export var bg1: any = 0;
export var sL: any = 0;
export var metI: any = 0;
export var player: any = 0;
var state: string = "NA";
var movedown: any[] = [];
var movedownframe: any = 0;
var movedownlastframe: any = 0;
var background: any = 0;

var moveup: any[] = [];
var moveupframe: any = 0;
var moveuplastframe: any = 0;

var rotateanticlockwise: any[] = [];
var rotateanticlockwiseframe: any = 0;
var rotateanticlockwiselastframe: any = 0;

var rotateclockwise: any[] = [];
var rotateclockwiseframe: any = 0;
var rotateclockwiselastframe: any = 0;

var raisehand: any[] = [];
var raisehandframe: any = 0;
var raisehandlastframe: any = 0;

var grabstrength: any[] = [];
var grabstrengthframe: any = 0;
var grabstrengthlastframe: any = 0;

//Variables related to ProgressBar
export var progressBarRect: any = undefined;

export const changeProgressBarColor = (ctx: p5, flag: boolean) => {
  if (flag) {
    progressBarRect = ctx.color(0, 255, 0);
  } else {
    progressBarRect = ctx.color(255, 0, 0);
  }
};

export const importImgs = (ctx: p5) => {
  //This function to load all the images used in the game
  pReg = ctx.loadImage(`${__path__}images/space-ship-pic/ship.png`);
  redLaser = ctx.loadImage(`${__path__}images/space-ship-pic/laserRed.png`);
  eI = ctx.loadImage(`${__path__}images/space-ship-pic/enemynew.png`);
  mouseC = ctx.loadImage(`${__path__}images/space-ship-pic/redShot.png`);
  bg1 = ctx.loadImage(`${__path__}images/space-ship-pic/space2.jpeg`);
  sL = ctx.loadImage(`${__path__}images/space-ship-pic/speedLine.png`);
  metI = ctx.loadImage(`${__path__}images/space-ship-pic/asteroidcrop.png`);
  player = ctx.loadImage(`${__path__}images/space-ship-pic/shiplife.png`);
  background = ctx.loadImage(
    `${__path__}images/space-ship-pic/black-background.jpg`
  );

  for (var i = 0; i < 27; i++) {
    var tmp = ctx.loadImage(
      `${__path__}images/space-ship-pic/movedown/frame_` +
        ctx.nf(i, 2) +
        `_delay-0.1s.gif`
    );
    movedown.push(tmp);
  }

  for (var i = 0; i < 28; i++) {
    var tmp = ctx.loadImage(
      `${__path__}images/space-ship-pic/moveup/frame_` +
        ctx.nf(i, 2) +
        `_delay-0.1s.gif`
    );
    moveup.push(tmp);
  }

  for (var i = 0; i < 23; i++) {
    var tmp = ctx.loadImage(
      `${__path__}images/space-ship-pic/rotateanticlockwise/frame_` +
        ctx.nf(i, 2) +
        `_delay-0.1s.gif`
    );
    rotateanticlockwise.push(tmp);
  }

  for (var i = 0; i < 26; i++) {
    var tmp = ctx.loadImage(
      `${__path__}images/space-ship-pic/rotateclockwise/frame_` +
        ctx.nf(i, 2) +
        `_delay-0.1s.gif`
    );
    rotateclockwise.push(tmp);
  }

  for (var i = 0; i < 24; i++) {
    var tmp = ctx.loadImage(
      `${__path__}images/space-ship-pic/raisehand/frame_` +
        ctx.nf(i, 2) +
        `_delay-0.1s.gif`
    );
    raisehand.push(tmp);
  }

  for (var i = 0; i < 28; i++) {
    var tmp = ctx.loadImage(
      `${__path__}images/space-ship-pic/grabstrength/frame_` +
        ctx.nf(i, 2) +
        `_delay-0.1s.gif`
    );
    grabstrength.push(tmp);
  }
};
export const printPlayerMine = (
  ctx: p5,
  width: number,
  height: number,
  posX: number
) => {
  ctx.imageMode(ctx.CENTER);
  ctx.image(pReg, posX, height - 60);
};
export const resetState = () => {
  state = "NA";
};
export const drawAnim = (
  ctx: p5,
  message: string,
  width: number,
  height: number
) => {
  if (state != "NA") {
    message = state;
  }
  var color = ctx.color(255, 0, 0);
  var fontSize = 25;
  ctx.fill(color);
  ctx.textSize(fontSize);
  ctx.text(message, width / 2 - 0.1 * width, height / 2 + 0.1 * height);
  switch (message) {
    case "Move your hand down": {
      movedownframe = (movedownframe + 1) % movedown.length;
      ctx.imageMode(ctx.CENTER);
      var img = movedown[movedownframe];
      ctx.image(img, width / 2, height / 2 - img.height / 2);

      if (movedownframe == 26 && movedownlastframe < 20) {
        movedownframe = 25;
        movedownlastframe++;
      } else {
        movedownlastframe = 0;
        state = "NA";
      }
      break;
    }
    case "Move your hand up": {
      moveupframe = (moveupframe + 1) % moveup.length;
      ctx.imageMode(ctx.CENTER);
      var img = moveup[moveupframe];
      ctx.image(img, width / 2, height / 2 - img.height / 2);

      if (moveupframe == 27 && moveuplastframe < 20) {
        moveupframe = 26;
        moveuplastframe++;
      } else {
        state = "NA";
        moveuplastframe = 0;
      }
      break;
    }
    case "Rotate your hand to the left to be flat.": {
      rotateanticlockwiseframe =
        (rotateanticlockwiseframe + 1) % rotateanticlockwise.length;
      ctx.imageMode(ctx.CENTER);
      var img = rotateanticlockwise[rotateanticlockwiseframe];
      ctx.image(img, width / 2, height / 2 - img.height / 2);

      if (rotateanticlockwiseframe == 22 && rotateanticlockwiselastframe < 20) {
        rotateanticlockwiseframe = 21;
        rotateanticlockwiselastframe++;
      } else {
        state = "NA";
        rotateanticlockwiselastframe = 0;
      }
      break;
    }
    case "Rotate your hand to the right to be flat.": {
      rotateclockwiseframe =
        (rotateclockwiseframe + 1) % rotateclockwise.length;

      ctx.imageMode(ctx.CENTER);
      var img = rotateclockwise[rotateclockwiseframe];
      ctx.image(img, width / 2, height / 2 - img.height / 2);

      if (rotateclockwiseframe == 25 && rotateclockwiselastframe < 20) {
        rotateclockwiseframe = 24;
        rotateclockwiselastframe++;
      } else {
        state = "NA";
        rotateclockwiselastframe = 0;
      }
      break;
    }
    case "Please, Raise your hand a bit more :)": {
      raisehandframe = (raisehandframe + 1) % raisehand.length;

      ctx.imageMode(ctx.CENTER);
      var img = raisehand[raisehandframe];
      ctx.image(img, width / 2, height / 2 - img.height / 2);

      if (raisehandframe == 23 && raisehandlastframe < 20) {
        raisehandframe = 22;
        raisehandlastframe++;
      } else {
        state = "NA";
        raisehandlastframe = 0;
      }
      break;
    }
    case "Please Stretch Your Fingers": {
      grabstrengthframe = (grabstrengthframe + 1) % grabstrength.length;

      ctx.imageMode(ctx.CENTER);
      var img = grabstrength[grabstrengthframe];
      ctx.image(img, width / 2, height / 2 - img.height / 2);

      if (grabstrengthframe == 27 && grabstrengthlastframe < 20) {
        grabstrengthframe = 26;
        grabstrengthlastframe++;
      } else {
        state = "NA";
        grabstrengthlastframe = 0;
      }
      break;
    }
    case "No Hand": {
      changeProgressBarColor(ctx, false);
      break;
    }
  }
};

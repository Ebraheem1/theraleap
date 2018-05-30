const p5 = require("p5/lib/p5.min") as any;

import { Game, GameConfiguration } from "@/games/types";
import { ClassificationData } from "@/classify";
import { GenericHandTrackingData } from "@/devices";
import { LeapDeviceFrame } from "@/devices/leapmotion";
import { project } from "@/ui/graphics/util";

// import { Bullet, SpaceRock } from "./types";
import { collisionCheck, checkGameover } from "./logic";

import {
  initializeData,
  loadImages,
  drawBackground,
  drawMario,
  drawAnim,
  checkHeart,
  checkFlower,
  doBezier,
  drawSteel
} from "./draw";
import Vue from "vue";

export default class SuperMarioGame implements Game {
  public iP5: p5 | undefined;

  private width!: number;
  private height!: number;

  private marioX: number = 0;
  private marioY: number = 0;

  private flowerX: number = 0;
  private flowerY: number = 0;

  private cheated: boolean = false;
  private score: number = 0;
  private gameOver: boolean = false;
  private paused: boolean = false;
  private game: number = 0;

  async onStart(
    config: GameConfiguration,
    notifyGameOver: (cb: (vm: Vue) => void) => void
  ) {
    this.width = config.element.clientWidth;
    this.height = config.element.clientHeight;
    this.marioX = config.element.clientWidth * 0.15;
    this.marioY = config.element.clientHeight - 100;

    initializeData(this.width, this.height);

    this.iP5 = new p5((s: p5) => {
      s.setup = () => {
        console.log(config.element.clientWidth);
        s.createCanvas(config.element.clientWidth, config.element.clientHeight);
        loadImages(s);
      };

      s.draw = () => {
        if (this.paused) {
          return;
        }
        drawBackground(this.width, this.height, s);
        drawMario(this.marioX, this.marioY, s);
        if (this.cheated) drawAnim(this.width, this.height, s);
        checkHeart(this.width, this.height, s);
        checkFlower(this.width, this.height, s);
        doBezier();
        drawSteel(s);
        this.marioX = collisionCheck(this.marioX, this.marioY, this.width);
        this.game = checkGameover();

        if (this.game == 1) {
          //win
        } else if (this.game == -1) {
          //lose
        } else {
          //draw scenes
        }

        // if (this.gameOver) {
        //   notifyGameOver((vm: Vue) => {
        //     vm.$router.push("/games/list");
        //   });
        //   s.remove();
        // } else {
        //   drawScene(s);
        //   drawScore(this.score, s);
        //   drawSpaceShip(this.x, this.y, s);
        //   drawSpaceRocks(this.spaceRocks, s);
        //   drawBullets(this.bullets, s);
        // }
      };
    }, config.element);
  }

  async onStop() {
    console.log("onStop");
  }

  async onPause() {
    this.paused = true;
  }

  async onResume() {
    this.paused = false;
  }

  onClassificationReceived(c: ClassificationData) {
    // console.log(c);
    if (c.actionName == "upwards") {
      this.marioY -= 0.25;
      this.cheated = false;
    } else if (c.actionName == "downwards") {
      this.marioY += 0.25;
      this.cheated = false;
    } else if (c.actionName == "cheated") {
      this.cheated = true;
    }
  }

  onMotionTrackingDataReceived(m: GenericHandTrackingData) {
    const leap = m.data as LeapDeviceFrame;
    const iBox = leap.interactionBox;
    if (leap.hands && leap.hands.length >= 1) {
      // this. = project(
      //   leap.hands[0].palmPosition[0],
      //   iBox.center[0] - iBox.size[0] / 2,
      //   iBox.center[0] + iBox.size[0] / 2,
      //   0,
      //   this.width
      // );
      // this.y = project(
      //   leap.hands[0].palmPosition[2],
      //   iBox.center[2] - iBox.size[2] / 2,
      //   iBox.center[2] + iBox.size[2] / 2,
      //   this.height - this.height / 4,
      //   this.height - 100
      // );
    }
  }
}

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
  private winState!: boolean;

  private maxAngleUpward: number = 0;
  private maxAngleDownward: number = 0;
  private wristAnglesArr: number[] = [];
  private maxTime: number = 0;
  // //This array holds the times required for the transition between upward movement and downward movements
  // private arr: any[] = [];

  async onStart(config: GameConfiguration, notifyGameState: () => void) {
    this.width = config.element.clientWidth;
    this.height = config.element.clientHeight;
    this.marioX = config.element.clientWidth * 0.15;
    this.marioY = config.element.clientHeight - 100;

    initializeData(this.width, this.height);

    this.iP5 = new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(config.element.clientWidth, config.element.clientHeight);
        s.frameRate(30);
        loadImages(s);
      };

      s.draw = () => {
        if (this.paused) {
          return;
        }
        this.marioX = collisionCheck(this.marioX, this.marioY, this.width);
        this.game = checkGameover();

        //1 -> win, -1 -> lose
        if (this.game == 1 || this.game == -1) {
          this.winState = this.game == 1 ? true : false;
          notifyGameState();
          s.remove();
        } else {
          drawBackground(this.width, this.height, s);
          drawMario(this.marioX, this.marioY, s);
          if (this.cheated) drawAnim(this.width, this.height, s);
          checkHeart(this.width, this.height, s);
          checkFlower(this.width, this.height, s);
          doBezier();
          drawSteel(s);
        }
      };
    }, config.element);
  }

  public async onStop(vm: Vue) {
    var flag = false;
    if (this.winState) flag = true;
    vm.$router.push({
      name: "game-over",
      params: {
        gameIdentifier: "super-mario",
        data: [
          "WA-LEAP",
          flag,
          this.maxTime,
          this.maxAngleUpward,
          this.maxAngleDownward,
          this.wristAnglesArr
        ]
      } as any
    });
  }

  async onPause() {
    this.paused = true;
  }

  async onResume() {
    this.paused = false;
  }

  onClassificationReceived(c: ClassificationData) {
    if (c.cheats.cheated && c.cheats.message == "Raise") {
      this.cheated = true;
    } else {
      this.cheated = false;
      var wristAngle = c.metrics.quality;
      if (wristAngle > 0)
        this.wristAnglesArr.push(
          c.actionName == "downwards" ? -1 * wristAngle : wristAngle
        );

      if (c.actionName == "upwards") {
        if (wristAngle > this.maxAngleUpward) this.maxAngleUpward = wristAngle;
        this.maxTime = Math.max(this.maxTime, c.time);
        this.marioY -= this.marioY > 30 ? 1 : 0;
        // this.cheated = false;
      } else if (c.actionName == "downwards") {
        if (wristAngle > this.maxAngleDownward)
          this.maxAngleDownward = wristAngle;
        this.maxTime = Math.max(this.maxTime, c.time);
        this.marioY += this.marioY <= this.height - 30 ? 1 : 0;
        // this.cheated = false;
      }
    }
  }

  onMotionTrackingDataReceived(m: GenericHandTrackingData) {}
}

const p5 = require("p5/lib/p5.min") as any;
import {
  progressBarRect,
  importImgs,
  player,
  redLaser,
  eI,
  metI,
  sL,
  mouseC,
  pReg,
  bg1,
  changeProgressBarColor,
  drawAnim,
  printPlayerMine
} from "./draw";
import { Game, GameConfiguration } from "@/games/types";

import { LeapDeviceFrame } from "@/devices/leapmotion/leaptrackingdata.ts";
import { ClassificationData } from "@/classify";
import { GenericHandTrackingData } from "@/devices";
import Vue from "vue";
import { project } from "@/ui/graphics/util";

export default class SpaceShipGame implements Game {
  public iP5: p5 | undefined;
  private x: number = 0;
  private ctx!: any;
  private pH!: number;
  private width!: number;
  private height!: number;
  private paused: boolean = false;
  private laserY: number = 0;
  private laserX: number = 0;
  private enemyX: number = 0;
  private enemyY: number = 0;
  private enemyH: number = 0;
  private enemyS: number = 0;
  private gameOver: number = 0;
  private pointDis: number = 0;
  private sl1y: number = 0;
  private sl2y: number = 0;
  private sl3y: number = 0;
  private sl4y: number = 0;
  private sl5y: number = 0;
  private sl6y: number = 0;
  private sl1x: number = 0;
  private sl2x: number = 0;
  private sl3x: number = 0;
  private sl4x: number = 0;
  private sl5x: number = 0;
  private sl6x: number = 0;
  private slS: number = 40;
  private mX: number = 0;
  private mY: number = 0;
  private posX: number = 240;
  private timeArray: number[] = [];
  private state: string = "NA";

  public printHealth(ctx: p5) {
    ctx.imageMode(ctx.CENTER);
    if (this.pH == 3) {
      ctx.image(player, this.width - 40, 20);
      ctx.image(player, this.width - 80, 20);
      ctx.image(player, this.width - 120, 20);
    }

    if (this.pH == 2) {
      ctx.image(player, this.width - 80, 20);
      ctx.image(player, this.width - 120, 20);
    }

    if (this.pH == 1) {
      ctx.image(player, this.width - 120, 20);
    }
  }
  public checkDistMine(ctx: p5, position: number) {
    this.posX = position;
    changeProgressBarColor(ctx, true);
  }
  public printEnemy(ctx: p5) {
    if (this.enemyH < 1) {
      this.enemyX = ctx.random(50, this.width - 50);
      this.enemyY = -40;
      this.enemyH = 2;
    } else {
      this.enemyY = this.enemyY + this.enemyS;
      if (this.enemyY > this.height - 40 && this.pointDis != -1) {
        this.gameOver = 1;
      }
      ctx.image(eI, this.enemyX, this.enemyY);
    }
  }
  public printMeteor(ctx: p5) {
    if (this.mY > this.height) {
      this.mY = ctx.random(-100, -40);
      this.mX = ctx.random(50, this.width - 20);
    } else {
      this.mY = this.mY + 2;
    }
    ctx.image(metI, this.mX, this.mY);
    if (
      this.laserX < this.mX + 30 &&
      this.laserX > this.mX - 30 &&
      this.laserY > this.mY - 30 &&
      this.laserY < this.mY + 30
    )
      this.mY = this.height + 30;

    if (
      this.posX < this.mX + 30 &&
      this.posX > this.mX - 30 &&
      this.height - 60 > this.mY - 30 &&
      this.height - 60 < this.mY + 30
    ) {
      this.pH = this.pH - 1;
      this.mY = this.height + 30;
      if (this.pH == 0 && this.pointDis != -1) {
        this.gameOver = 1;
      }
    }
  }
  public damageCheck() {
    if (
      this.laserX < this.enemyX + 30 &&
      this.laserX > this.enemyX - 30 &&
      this.laserY > this.enemyY - 70 &&
      this.laserY < this.enemyY + 70
    ) {
      this.enemyH = this.enemyH - 1;
      this.laserY = -10;
      this.pointDis = this.pointDis + 100;
    }
  }
  public printScore(ctx: p5) {
    ctx.textSize(20);
    ctx.text(this.pointDis, 20, 40);
  }
  public genSL(ctx: p5) {
    if (this.sl1y > 360) {
      this.sl1x = ctx.random(0, this.width);
      this.sl1y = ctx.random(-40, 0);
    }

    if (this.sl2y > 360) {
      this.sl2x = ctx.random(0, this.width);
      this.sl2y = ctx.random(-40, 0);
    }

    if (this.sl3y > 360) {
      this.sl3x = ctx.random(0, this.width);
      this.sl3y = ctx.random(-40, 0);
    }

    this.sl1y = this.sl1y + this.slS / 2;
    this.sl2y = this.sl2y + this.slS / 2;
    this.sl3y = this.sl3y + this.slS / 2;
  }
  public drawProgressBar(ctx: p5) {
    if (progressBarRect) {
      ctx.rectMode(ctx.CENTER);
      ctx.fill(progressBarRect);
      ctx.rect(this.width - 80, 45, 80, 10);
    }
  }
  public drawBg(ctx: p5) {
    ctx.imageMode(ctx.CORNER);
    for (var i = 0; i < this.width; i += 284)
      for (var j = 0; j < this.height; j += 177) ctx.image(bg1, i, j);
  }
  public playLaser() {
    if (this.laserY < 0) {
      this.laserY = this.height - 60;
      this.laserX = this.posX;
    }
  }
  public async onStart(config: GameConfiguration, notifyGameOver: () => void) {
    this.width = config.element.clientWidth;
    this.height = config.element.clientHeight;
    this.mY = this.height + 1;
    this.iP5 = new p5((s: p5) => {
      s.setup = () => {
        s.createCanvas(config.element.clientWidth, config.element.clientHeight);
        s.frameRate(30);
        importImgs(s);
        this.gameOver = 0;
        this.enemyS = 3;
        this.pH = 3;
        this.ctx = s;
      };
      s.draw = () => {
        if (this.paused) {
          return;
        }
        if (this.gameOver == 0 && this.pointDis < 2000) {
          this.drawBg(s);
          this.drawProgressBar(s);
          s.imageMode(s.CENTER);
          s.image(redLaser, this.laserX, this.laserY - 40);
          this.laserY = this.laserY - 40;
          printPlayerMine(s, this.width, this.height, this.posX);
          this.printEnemy(s);
          this.printMeteor(s);
          this.damageCheck();
          this.printScore(s);
          this.enemyS = 0.5;
          this.genSL(s);
          s.imageMode(s.CENTER);
          s.image(mouseC, this.posX, this.height - 60);
          s.image(sL, this.sl1x, this.sl1y);
          s.image(sL, this.sl2x, this.sl2y);
          s.image(sL, this.sl3x, this.sl3y);
          this.printHealth(s);
        } else if (this.pointDis >= 2000 && this.gameOver != 1) {
          //this assignment to prevent the draw function to enter this if condition again
          this.pointDis = -1;
        }
      };
    }, config.element);
  }
  public async onStop(vm: Vue) {}

  public async onPause() {
    //this.paused = true;
  }

  public async onResume() {
    //this.paused = false;
  }

  public onClassificationReceived(c: ClassificationData) {
    if (this.pointDis == 2000 || this.pointDis == -1 || this.gameOver == 1) {
      return;
    }
    if (c && c.actionName == "SHOT-TI") {
      this.playLaser();
      this.state = "NA";
    } else if (c && c.cheats.cheated) {
      //This is generic file, as
      //there might be other classifiers that use the same game and they don't have
      //any cheating cases, thus, c.cheats.cheated will always evaluate to false
      //otherwise it should be handled differently
      if (this.state != "NA")
        drawAnim(this.ctx, this.state, this.width, this.height);
      else drawAnim(this.ctx, c.cheats.message, this.width, this.height);
    } else if (c && c.actionName == "NA-TI") {
      this.state = "NA";
    }
    if (c && !c.cheats.cheated && c.time > 0) {
      this.timeArray.push(c.time);
    }
  }
  public onMotionTrackingDataReceived(m: GenericHandTrackingData) {
    if (this.gameOver == 0 || (this.pointDis < 2000 && this.pointDis != -1)) {
      const leap = m.data as LeapDeviceFrame;
      if (
        leap.hands.length == 1 &&
        !(this.gameOver == 1 || this.pointDis >= 2000 || this.pointDis == -1)
      ) {
        const iBox = leap.interactionBox;
        var position = leap.pointables[1].stabilizedTipPosition;
        var x = project(
          leap.hands[0].palmPosition[0],
          iBox.center[0] - iBox.size[0] / 2,
          iBox.center[0] + iBox.size[0] / 2,
          0,
          this.width
        );
        this.checkDistMine(this.ctx, x);
      }
    }
  }
}

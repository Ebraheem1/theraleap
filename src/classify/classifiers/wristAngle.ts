import { Observable, Operator, Subscriber } from "rxjs";
import { filter, map } from "rxjs/operators";

import { GenericHandTrackingData } from "@/devices/generic";
import {
  LeapHandTrackingData,
  LeapPointable,
  LeapHand
} from "@/devices/leapmotion";
import { ClassificationData } from "@/classify";
import { LeapDeviceFrame } from "@/devices/leapmotion/leaptrackingdata";

export const WristAngleClassifierId = "WristAngleClassifier-V0.1";

const checkCheats = (hand: LeapHand): boolean => {
  if (hand.stabilizedPalmPosition[1] < 180) return true;
  else return false;
};

const directionUp = (tipPosition: number[], metacarpal: number[]): boolean => {
  if (tipPosition[1] > metacarpal[1]) return true;
  else return false;
};

const dotProduct = (arr1: number[], arr2: number[]): number => {
  return (
    arr1[0] * arr2[0] * -1 + arr1[1] * arr2[1] * -1 + arr1[2] * arr2[2] * -1
  ); //-1 since armBasis[3] is opposite direction to arm.direction()
};

export class WristAngleClassifier
  implements Operator<LeapHandTrackingData, ClassificationData> {
  constructor(
    private detectionUpperAngleThreshold: number,
    private detectionLowerAngleThreshold: number,
    private handType: string,
    private difficulty: string,
    private timeStart: Date,
    private startCheating: Date,
    private cheatingTime: number = 0,
    private cheatingFlag: boolean = false,
    private lastUpwards: boolean = false,
    private lastDownwards: boolean = true,
    private stopHolding: boolean = false
  ) {}

  public call(
    subscriber: Subscriber<ClassificationData>,
    source: Observable<LeapHandTrackingData>
  ) {
    return source
      .pipe(
        map((frame: LeapHandTrackingData) => {
          if (frame.data.hands.length == 0) {
            if (
              this.stopHolding &&
              this.timeStart !== undefined &&
              !this.cheatingFlag
            ) {
              this.cheatingFlag = true;
              this.startCheating = new Date();
            }
            return {
              actionName: "NA",
              metrics: {
                quality: 0
              },
              cheats: {
                cheated: true,
                message: "No Hand"
              },
              time: -1,
              extra: undefined
            };
          }

          var hand = frame.data.hands[0];
          if (hand.type != this.handType) {
            if (
              this.stopHolding &&
              this.timeStart !== undefined &&
              !this.cheatingFlag
            ) {
              this.cheatingFlag = true;
              this.startCheating = new Date();
            }
            return {
              actionName: "NA",
              metrics: {
                quality: 0
              },
              cheats: {
                cheated: true,
                message: "Wrong Hand"
              },
              time: -1,
              extra: undefined
            };
          }

          var handDirection = hand.direction;
          var wristDirection = hand.armBasis[2];
          var wristAngle =
            Math.acos(dotProduct(wristDirection, handDirection)) *
            (180 / Math.PI);
          var upDirection = directionUp(
            frame.data.pointables[2].dipPosition,
            frame.data.pointables[2].mcpPosition
          );

          var cheated = checkCheats(hand);
          // var wristAngleNumber = Number.parseFloat(wristAngle).toPrecision(4);

          if (cheated) {
            if (
              this.stopHolding &&
              this.timeStart != undefined &&
              !this.cheatingFlag
            ) {
              this.cheatingFlag = true;
              this.startCheating = new Date();
            }
            return {
              actionName: "NA",
              metrics: {
                quality: 0
              },
              cheats: {
                cheated: true,
                message: "Raise"
              },
              time: -1,
              extra: undefined
            };
          }
          var diff =
            this.difficulty == "easy"
              ? 2.4
              : this.difficulty == "medium"
                ? 1.5
                : 0.8;
          if (this.cheatingFlag) {
            this.cheatingFlag = false;
            var now = new Date();
            this.cheatingTime += now.getTime() - this.startCheating.getTime();
          }
          if (upDirection && wristAngle >= this.detectionUpperAngleThreshold) {
            var time = 0;
            if (this.lastUpwards) {
              this.cheatingTime = 0;
              this.stopHolding = false;
            } else if (this.lastDownwards && this.timeStart != undefined) {
              var now = new Date();
              time =
                now.getTime() - this.timeStart.getTime() - this.cheatingTime;
              // this.timeStart = new Date();
              this.cheatingTime = 0;
              this.lastUpwards = true;
              this.lastDownwards = false;
              this.stopHolding = false;
            }
            return {
              actionName: "upwards",
              metrics: {
                quality: hand.confidence >= 0.7 ? wristAngle : 0
              },
              cheats: {
                cheated: false,
                message: "NA"
              },
              time: time,
              extra: { difficulty: diff }
            };
          } else if (
            !upDirection &&
            wristAngle >= this.detectionLowerAngleThreshold
          ) {
            var time = 0;
            if (this.lastDownwards) {
              this.cheatingTime = 0;
              this.stopHolding = false;
            } else if (this.lastUpwards && this.timeStart != undefined) {
              var now = new Date();
              time =
                now.getTime() - this.timeStart.getTime() - this.cheatingTime;
              // this.timeStart = new Date();
              this.cheatingTime = 0;
              this.lastUpwards = false;
              this.lastDownwards = true;
              this.stopHolding = false;
            }
            return {
              actionName: "downwards",
              metrics: {
                quality: wristAngle
              },
              cheats: {
                cheated: false,
                message: "NA"
              },
              time: time,
              extra: { difficulty: diff }
            };
          } else {
            if (!this.stopHolding) {
              this.stopHolding = true;
              if (this.timeStart === undefined) this.cheatingTime = 0;
              this.timeStart = new Date();
            }
            return {
              actionName: "no gesture detected",
              metrics: {
                quality: upDirection ? wristAngle : -1 * wristAngle
              },
              cheats: {
                cheated: false,
                message: "NA"
              },
              time: -1,
              extra: { difficulty: diff }
            };
          }
        }),
        filter(x => x !== undefined)
      )
      .subscribe(subscriber);
  }
}

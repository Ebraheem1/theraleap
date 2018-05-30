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
    private handType: string
  ) {}

  public call(
    subscriber: Subscriber<ClassificationData>,
    source: Observable<LeapHandTrackingData>
  ) {
    return source
      .pipe(
        map((frame: LeapHandTrackingData) => {
          // console.log("k");
          if (frame.data.hands.length == 0) return;

          var hand = frame.data.hands[0];
          if (hand.type != this.handType) return;

          // console.log(hand.wrist);
          var handDirection = hand.direction;
          var wristDirection = hand.armBasis[2];
          // console.log(hand);
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
            return {
              actionName: "cheated",
              metrics: {
                quality: 0,
                cheats: {
                  cheated: true,
                  message: "Please, Raise your hand a bit more :)"
                }
              }
            };
          }
          if (
            upDirection &&
            wristAngle >= this.detectionUpperAngleThreshold &&
            !cheated
          ) {
            return {
              actionName: "upwards",
              metrics: {
                quality: 0,
                cheats: {
                  cheated: false,
                  message: "NA"
                }
              }
            };
          } else if (
            !upDirection &&
            wristAngle >= this.detectionLowerAngleThreshold &&
            !cheated
          ) {
            return {
              actionName: "downwards",
              metrics: {
                quality: 0,
                cheats: {
                  cheated: false,
                  message: "NA"
                }
              }
            };
          } else {
            return undefined;
          }
        }),
        filter(x => x !== undefined)
      )
      .subscribe(subscriber);
  }
}

//

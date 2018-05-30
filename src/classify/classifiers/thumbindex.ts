import { Observable, Operator, Subscriber } from "rxjs";
import {
  filter,
  map,
  bufferTime,
  debounceTime,
  throttleTime
} from "rxjs/operators";

import { GenericHandTrackingData } from "@/devices/generic";
import { LeapHandTrackingData, LeapPointable } from "@/devices/leapmotion";
import { ClassificationData } from "@/classify";
import {
  LeapDeviceFrame,
  LeapHand
} from "@/devices/leapmotion/leaptrackingdata";
const vec3 = require("gl-vec3") as any;
export const ThumbIndexClassifierId = "ThumbIndexClassifierId-V0.1";

const directionUp = (tipPosition: number[], metacarpal: number[]): boolean => {
  if (tipPosition[1] > metacarpal[1]) return true;
  else return false;
};

export const normalizePoint = (
  pos: number[],
  center: number[],
  size: number[],
  flag: boolean
): number[] => {
  var vect = [0, 0, 0];
  vect[0] = (pos[0] - center[0]) / size[0] + 0.5;
  vect[1] = (pos[1] - center[1]) / size[1] + 0.5;
  vect[2] = (pos[2] - center[2]) / size[2] + 0.5;
  if (flag) {
    vect[0] = Math.min(Math.max(vect[0], 0), 1);
    vect[1] = Math.min(Math.max(vect[1], 0), 1);
    vect[2] = Math.min(Math.max(vect[2], 0), 1);
  }
  return vect;
};
const dotProduct = (arr1: number[], arr2: number[]): number => {
  return (
    arr1[0] * arr2[0] * -1 + arr1[1] * arr2[1] * -1 + arr1[2] * arr2[2] * -1
  ); //-1 since armBasis[3] is opposite direction to arm.direction()
};
//Retrieve the rotation angle around the z-axis in Radians
const roll = (x: number, y: number): number => {
  return Math.atan2(x, -1 * y);
};

interface ThumbIndexLeapHelpers {
  measuringAngleBetweenFingers(frame: LeapDeviceFrame): number | undefined;
  checkThumb(angle: number): boolean;
}
//Special function used for the bones as we don't have access to the bone's direction method

export class ThumbIndexClassifier
  implements
    Operator<LeapHandTrackingData, ClassificationData>,
    ThumbIndexLeapHelpers {
  constructor(private detectionThreshold: number, private thumbState: boolean) {
    thumbState = false;
  }
  public measuringAngleBetweenFingers(
    frame: LeapDeviceFrame
  ): number | undefined {
    if (frame.hands.length == 1) {
      var thumbDirection = frame.pointables[0].direction;
      var indexDirection = frame.pointables[1].direction;
      var angle =
        Math.acos(vec3.dot(thumbDirection, indexDirection)) * (180 / Math.PI);
      return angle;
    } else {
      return undefined;
    }
  }
  public checkThumb(angle: number): boolean {
    if (angle > this.detectionThreshold && !this.thumbState) {
      return true;
    } else if (this.thumbState && angle < this.detectionThreshold) {
      this.thumbState = false;
      return false;
    } else {
      return false;
    }
  }

  public call(
    subscriber: Subscriber<ClassificationData>,
    source: Observable<LeapHandTrackingData>
  ) {
    return source
      .pipe(
        map((frame: LeapHandTrackingData) => {
          if (frame.data.hands.length == 1) {
            var hand = frame.data.hands[0];
            var palmPosition = hand.stabilizedPalmPosition[1];
            var handDirection = hand.direction;
            var armDirection = hand.armBasis[2];
            var wristAngle =
              Math.acos(dotProduct(armDirection, handDirection)) *
              (180 / Math.PI);
            //Roll here represents the rotation around the z-axis
            var rotationAngle =
              roll(hand.palmNormal[0], hand.palmNormal[1]) * (180 / Math.PI);

            if (hand.stabilizedPalmPosition[1] < 270) {
              return {
                actionName: "NA",
                metrics: {
                  quality: 0
                },
                cheats: {
                  cheated: true,
                  message: "Please, Raise your hand a bit more :)"
                }
              };
            } else if (Math.floor(rotationAngle) > 20) {
              return {
                actionName: "NA",
                metrics: {
                  quality: 0
                },
                cheats: {
                  cheated: true,
                  message: "Rotate your hand to the right to be flat."
                }
              };
            } else if (Math.floor(rotationAngle) < -20) {
              return {
                actionName: "NA",
                metrics: {
                  quality: 0
                },
                cheats: {
                  cheated: true,
                  message: "Rotate your hand to the left to be flat."
                }
              };
            } else if (wristAngle > 20) {
              var tip = frame.data.pointables[2].dipPosition;
              var metacarpal = frame.data.pointables[2].mcpPosition;
              var flag = directionUp(tip, metacarpal);
              var msg = "";
              if (flag) {
                msg = "Move your hand down";
              } else {
                msg = "Move your hand up";
              }
              return {
                actionName: "NA",
                metrics: {
                  quality: 0
                },
                cheats: {
                  cheated: true,
                  message: msg
                }
              };
            } else if (hand.grabStrength > 0.1) {
              return {
                actionName: "NA",
                metrics: {
                  quality: 0
                },
                cheats: {
                  cheated: true,
                  message: "Please Stretch Your Fingers."
                }
              };
            }
            var angle = this.measuringAngleBetweenFingers(frame.data);
            if (angle && this.checkThumb(angle)) {
              return {
                actionName: "SHOT",
                metrics: {
                  quality: 0
                },
                cheats: {
                  cheated: false,
                  message: "NA"
                }
              };
            } else {
              return undefined;
            }
          } else {
            return undefined;
          }
        })
      )
      .subscribe(subscriber);
  }
}

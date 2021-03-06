import { Observable, Operator, Subscriber } from "rxjs";
import { filter, map } from "rxjs/operators";

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
  constructor(
    private detectionThreshold: number,
    private thumbState: boolean,
    private startCheat: any,
    private cheatedTime: any,
    private prevtime: any
  ) {
    //This variable is used to report the transition of the thumb movement
    //So it's true once the patient reaches the threshold while he/she had in the
    //previous frames angles less than the threshold
    this.thumbState = false;
    this.startCheat = -1;
    this.cheatedTime = 0;
    this.prevtime = 0;
  }
  //This function measures the angle between the thumb and the index fingers in a frame
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
  //This Function compares the angle that is detected in a valid non-cheated frame
  //with the threshold configured in the classifier
  public checkThumb(angle: number): boolean {
    if (angle >= this.detectionThreshold && !this.getThumbState()) {
      this.setThumbState(true);
      return true;
    } else if (this.getThumbState() && angle < this.detectionThreshold) {
      this.setThumbState(false);
      return false;
    } else {
      return false;
    }
  }

  public setThumbState(bol: boolean) {
    this.thumbState = bol;
  }
  public getThumbState(): boolean {
    return this.thumbState;
  }

  public call(
    subscriber: Subscriber<ClassificationData>,
    source: Observable<LeapHandTrackingData>
  ) {
    return source
      .pipe(
        map((frame: LeapHandTrackingData) => {
          //We need to work with frames that contain only one Hand
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
            //Height above the leap motion device, should be high enough
            if (hand.stabilizedPalmPosition[1] < 270) {
              this.startCheat =
                this.startCheat == -1 ? new Date() : this.startCheat;
              return {
                actionName: "NA",
                metrics: {
                  quality: 0
                },
                cheats: {
                  cheated: true,
                  message: "Please, Raise your hand a bit more :)"
                },
                time: -1,
                extra: undefined
              };
            } else if (Math.floor(rotationAngle) > 20) {
              this.startCheat =
                this.startCheat == -1 ? new Date() : this.startCheat;
              return {
                actionName: "NA",
                metrics: {
                  quality: 0
                },
                cheats: {
                  cheated: true,
                  message: "Rotate your hand to the right to be flat."
                },
                time: -1,
                extra: undefined
              };
            } else if (Math.floor(rotationAngle) < -20) {
              this.startCheat =
                this.startCheat == -1 ? new Date() : this.startCheat;
              return {
                actionName: "NA",
                metrics: {
                  quality: 0
                },
                cheats: {
                  cheated: true,
                  message: "Rotate your hand to the left to be flat."
                },
                time: -1,
                extra: undefined
              };
            } else if (wristAngle > 20) {
              var tip = frame.data.pointables[2].dipPosition;
              var metacarpal = frame.data.pointables[2].mcpPosition;
              var flag = directionUp(tip, metacarpal);
              var msg = "";
              this.startCheat =
                this.startCheat == -1 ? new Date() : this.startCheat;
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
                },
                time: -1,
                extra: undefined
              };
            } else if (hand.grabStrength > 0.1) {
              this.startCheat =
                this.startCheat == -1 ? new Date() : this.startCheat;
              return {
                actionName: "NA",
                metrics: {
                  quality: 0
                },
                cheats: {
                  cheated: true,
                  message: "Please Stretch Your Fingers."
                },
                time: -1,
                extra: undefined
              };
            }
            //Reaching this line means that this frame contains no cheats at all
            if (this.startCheat != -1) {
              var now: any = new Date();
              this.cheatedTime += now - this.startCheat;
              this.startCheat = -1;
            }
            var angle = this.measuringAngleBetweenFingers(frame.data);
            var now: any = new Date();
            var timetaken: any = 0;
            if (angle && this.checkThumb(angle)) {
              //When it shots it just can finish the timer calculations
              //We don't care about the time take to reach the very first threshold in the system
              //therefore, we initialize prevtime with 0
              if (this.prevtime == 0) {
                this.prevtime = now;
                timetaken = -1;
              } else {
                timetaken = now - this.prevtime - this.cheatedTime;
                this.prevtime = now;
                this.cheatedTime = 0;
              }
              return {
                actionName: "SHOT-TI-L",
                metrics: {
                  quality: 0
                },
                cheats: {
                  cheated: false,
                  message: "NA"
                },
                time: timetaken,
                extra: frame.data
              };
            } else {
              return {
                actionName: "NA-TI-L",
                metrics: {
                  quality: 0
                },
                cheats: {
                  cheated: false,
                  message: "NA"
                },
                time: timetaken,
                extra: frame.data
              };
            }
          } else if (frame.data.hands.length == 0) {
            this.startCheat =
              this.startCheat == -1 ? new Date() : this.startCheat;
            return {
              actionName: "NA",
              metrics: {
                quality: 0
              },
              cheats: {
                cheated: true,
                message: "No Hand"
              },
              time: timetaken,
              extra: undefined
            };
          } else {
            this.startCheat =
              this.startCheat == -1 ? new Date() : this.startCheat;
            return undefined;
          }
        }),
        filter(x => x !== undefined)
      )
      .subscribe(subscriber);
  }
}

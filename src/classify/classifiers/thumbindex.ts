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
import { LeapDeviceFrame } from "@/devices/leapmotion/leaptrackingdata";

export const ThumbIndexClassifierId = "ThumbIndexClassifierId-V0.1";

export class ThumbIndexClassifier
  implements Operator<LeapHandTrackingData, ClassificationData> {
  constructor(private detectionThreshold: number) {}
  public call(
    subscriber: Subscriber<ClassificationData>,
    source: Observable<LeapHandTrackingData>
  ) {
    return source
      .pipe(
        map((frame: LeapHandTrackingData) => {
          if (frame.data.hands.length > 0) {
            return {
              actionName: "ONE_SHOT",
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
        })
      )
      .subscribe(subscriber);
  }
}

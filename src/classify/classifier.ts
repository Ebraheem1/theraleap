import { GenericHandTrackingData } from "@/devices";
import { HandTrackRecording } from "@/state/modules/record";
import { Observable } from "rxjs";

export interface ClassificationData {
  actionName: string;
  //I see that metrics does not make any sense in our games !
  metrics: ClassificationMetrics;
  cheats: ClassificationCheats;
  time: any;
  extra: any;
}

export interface ClassificationMetrics {
  quality: number;
}

export interface ClassificationCheats {
  cheated: boolean;
  message: string;
}

export interface ClassifierConfig {
  args: any[];
  identifier: string;
}

export interface Classifier {
  classify(
    source: Observable<GenericHandTrackingData>
  ): Observable<ClassificationData>;
}

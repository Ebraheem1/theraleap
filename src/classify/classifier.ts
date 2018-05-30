import { Observable } from "rxjs";
import { GenericHandTrackingData } from "@/devices";
import { HandTrackRecording } from "@/state/modules/record";

export interface ClassificationData {
  actionName: string;
  metrics: ClassificationMetrics;
}

export interface ClassificationMetrics {
  quality: number;
  cheats: ClassificationCheats;
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

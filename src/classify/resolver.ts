import { GenericHandTrackingData } from "@/devices";
import { Operator } from "rxjs";
import { ClassificationData, Classifier, ClassifierConfig } from "./classifier";

import {
  ThumbSpreadClassifier,
  ThumbSpreadClassifierId
} from "@/classify/classifiers/thumbspread";

import {
  ThumbIndexClassifierId,
  ThumbIndexClassifier
} from "@/classify/classifiers/thumbindex";

export const ClassifierRegistry: {
  [_: string]: { new (...args: any[]): Operator<any, any> };
} = {
  [ThumbSpreadClassifierId]: ThumbSpreadClassifier,
  [ThumbIndexClassifierId]: ThumbIndexClassifier
};

export const ClassifyResolver = (
  config: ClassifierConfig
): Operator<any, any> => {
  return new ClassifierRegistry[config.identifier](...config.args);
};

import { ClassifierConfig, ClassifyResolver } from "@/classify";
import { LeapWorkerContext } from "@/devices/threadedleap2/leapworker/types";
import { Subject, Observable } from "rxjs";
import { ClassificationData } from "@/classify/classifier";
import { GenericHandTrackingData } from "@/devices";
import { WORKER_EVT_CLASSIFICATION } from "../messages";

export const updateClassifier = (
  conf: ClassifierConfig | undefined,
  ctx: LeapWorkerContext
) => {
  if (ctx.pipeline.classifySubscription) {
    ctx.pipeline.classifySubscription.unsubscribe();
  }
  if (ctx.pipeline.classifyOutputSubscription) {
    ctx.pipeline.classifyOutputSubscription.unsubscribe();
  }
  if (conf !== undefined) {
    ctx.pipeline.classifySubject = new Subject<GenericHandTrackingData>().pipe(
      (source: Observable<any>) => {
        return source.lift(ClassifyResolver(conf));
      }
    ) as Subject<GenericHandTrackingData>;
    ctx.pipeline.classifySubscription = ctx.pipeline.preprocessSubject.subscribe(
      ctx.pipeline.classifySubject
    );
    ctx.pipeline.classifyOutputSubscription = ctx.pipeline.classifySubject.subscribe(
      data => {
        console.log(data);
        ctx.postMessage({
          type: WORKER_EVT_CLASSIFICATION,
          payload: data
        });
      }
    );
    ctx.currentClassifierConfig = conf;
    console.debug("New Classifier", conf);
  }
};
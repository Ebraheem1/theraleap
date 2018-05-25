<template>
    <md-card>
      <md-card-header>
        <div class="md-title">Thumb Index Classifier</div>
        <div class="md-subhead">******</div>
        <!-- <div class="enabled">
            <md-switch
              :value="!thumbIndexClassifierEnabled"
              @change="classifierSelectionUpdated"
              class="md-accent">Enable</md-switch>
        </div> -->
      </md-card-header>

      <md-card-content>
        <md-subheader>Classifier Description</md-subheader>
        <section>
          <h1>General</h1>
          Example Classifier initially provided with Theraleap. It does a naive classification of whether the User is spreading the Thumb. This classifier is intentionally very crude, as not much time was invested in its conception (development of classifiers is no integral part of the Theraleap student research project). Instead, this classifier is supposed to give a proof of concept of how classifiers are integrated and configured in Theraleap.
          <h1>Algorithm</h1>
          This classifier detects the extension of the thumb. It does so naively simply by looking at the thumb position in a configurable timeframe (<s-code>window</s-code>). It first computes the difference between the maximum and minimum thumb positions in the timeframe. If (and only if) a significant decisive factor is determined (as configured by <s-code>detectionThreshold</s-code>), the first derivative of the historic thumb positions is taken, and the first zero intersection is searched. Zero intersections of the first derivatives denote a change of direction. If a zero intersection is found in the first derivative, it is fuzzily (as configurable through <s-code>symmetryTolerance</s-code>) determined if the intersection is centered in the dataset. Finally, the detection may be throttled (<s-code>detectionThrottle</s-code>) in order to prevent duplicate detections.
          <h1>Performance Metric</h1>
          This classifier includes no Performance Metric. Metrics based on a configurable maximum Spread distance are thinkable as a possible next step.
          <h1>Cheat Metric</h1>
          This classifier includes no Cheat Metric.
          <h1>Room for Improvement</h1>
          This classifier should be replaced with something more robust in the future. The most fundamental flaw currently is that the classification is done based on thumb position alone, now something that makes more sense like thumb / index angle. Also, it only works for the left hand, but making the classifier independent of handedness is trivial.
        </section>
        <md-subheader>Classifier Settings</md-subheader>
        <md-divider></md-divider>
        <md-field>
          <label>Detection Threshold</label>
          <md-input v-model="thumbIndexThreshold" type="number" />
          <span class="md-helper-text">How generously to move forward with the detection. The bigger this number, the further the thumb has to be spread.</span>
        </md-field>
      </md-card-content>
    </md-card>
</template>
<script lang="ts">
import Vue from "vue";
import { Observable } from "rxjs";
import { Inject, Component, Prop } from "vue-property-decorator";
import { Classifier, ClassifierRegistry } from "@/classify";

import Code from "@/ui/utils/Code.vue";
import { HandTrackRecording } from "@/state/modules/record";
import { createFakeDeviceStream, GenericHandTrackingData } from "@/devices";

import {
  getClassifiers,
  modifyClassifier,
  disableAllClassifiers,
  getActiveClassifier
} from "@/state/modules/classifiers";
import { getDeviceFacade } from "@/state/modules/device";

const EVT_CLASSIFIER_SEL_UPDATED = "classifierSelectionUpdated";

export default class ThumbIndexClassifier extends Vue {
  @Prop() public config!: any;

  public classifierSelectionUpdated() {
    this.$emit(EVT_CLASSIFIER_SEL_UPDATED, "ThumbIndexClassifier");
  }

  get thumbIndexThreshold() {
    return this.config.thumbIndexThreshold;
  }

  set thumbIndexThreshold(newValue: string) {
    modifyClassifier(this.$store, {
      name: "ThumbIndexClassifier",
      newState: { threshold: parseInt(newValue) }
    });
    this.classifierSelectionUpdated();
  }

  get thumbIndexClassifierEnabled() {
    return this.config.enabled;
  }
}
</script>
<style lang="scss" scoped>
.md-card {
  max-width: 800px;
}
.md-card-media {
  height: 400px;
}
.md-field {
  margin-bottom: 60px;
}

.loading {
  background: black;
  height: 400px;
  display: flex;
  .md-progress-spinner {
    margin: auto;
  }
}
</style>

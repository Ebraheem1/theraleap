<template>
    <md-card>
      <md-card-header>
        <div class="md-title">Thumb Index Classifier</div>
        <div class="md-subhead">It detects the angle between the thumb and the index fingers and once the angle reaches or exceeds the threshold, the classifier is activated</div>
        <div class="enabled">
            <md-switch
              :value="!thumbIndexClassifierEnabled"
              @change="classifierSelectionUpdated"
              class="md-accent">Enable</md-switch>
        </div>
      </md-card-header>

      <md-card-content>
        <md-subheader>Classifier Description</md-subheader>
        <section>
          <h1>General</h1>
          This Classifier is designed to meet the therapist requirements. The main requirement that lead to develop this Classifier was to detect the angle in the 2D space between the thumb and the index fingers. Thus, depending on the raw data streamed from the leap motion API, the classifier is computing the angle and evaluating some metrics to make sure that the angles measured are as accurate as they possibly can be.
          <h1>Algorithm</h1>
          The Algorithm of this classifier is briefly working as follows. It first checks that the leap motion is detecting only one hand in the frame to make the calculation more accurate, otherwise, it descards the whole frame. Then it calculates some metrics that has nothing to do with the index or the thumb fingers, but these metrics are useful in order to enable the classifer detecting that the patient is doing the hand movement without any cheats or any wrong movements, these metrics are (<s-code>wrist angle</s-code>), (<s-code>height of the hand from the leap device</s-code>), (<s-code>the grab strength of the hand</s-code>) and (<s-code>rotation angle of the hand in all directions</s-code>). It also calculates the time taken by the patient to reach the threshold without cheating in the hand movements. In other words, the cheated time is discarded from the time calculation done by the classifier, which enables revealing more accurate time calculations. Last but not least, the angle between the index and the thumb Fingers are calculated using dot product between the position of both fingers. That means the algorithm treats each finger as if it's a vector that has a direction in x, y and z axes. 
          <h1>Performance Metric</h1>
          This classifier includes no Performance Metric.
          <h1>Cheat Metric</h1>
          This classifier includes cheat metrics as stated in the Algorithm sub-section above. Those Metrics are (<s-code>wrist angle</s-code>), (<s-code>height of the hand from the leap device</s-code>), (<s-code>the grab strength of the hand</s-code>) and (<s-code>rotation angle of the hand in all directions</s-code>).
          <h1>Room for Improvement</h1>
          Improving the Classifier quality by detecting the angle between the thumb and the index fingers only in the 2D space. In other words, treating the hand as a 2D object while calculating the angle only and to retrieve the data related to the hand as a 2D object from leap motion API (which is not provided up to this moment).
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

@Component({
  components: {
    "s-code": Code
  }
})
export default class ThumbIndexClassifier extends Vue {
  @Prop() public config!: any;

  public classifierSelectionUpdated() {
    this.$emit(EVT_CLASSIFIER_SEL_UPDATED, "ThumbIndexClassifier");
  }

  get thumbIndexThreshold() {
    return this.config.threshold;
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

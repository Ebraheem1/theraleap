<template>
    <md-card>
      <md-card-header>
        <div class="md-title">Wrist Angle Classifier</div>
        <div class="md-subhead">Detection based on the angle between the hand and wrist reaching the thresholds</div>
        <div class="enabled">
          <md-switch
            :value="!wristAngleClassifierEnabled"
            @change="classifierSelectionUpdated"
            class="md-accent">Enable</md-switch>
        </div>
      </md-card-header>

      <md-card-content>
        <md-subheader>Classifier Description</md-subheader>
        <section>
          <h1>General</h1>
          This classifier deals with patients recovering from wrist problems. It aims to detect the angle between the hand and the wrist and activated when such angle reaches a certain threshold. It also measures the time taken to reach a such threshold.
          <h1>Algorithm</h1>
          The classifier works as follows, when the hand is detected it first computes the angle between the hand and wrist by taking the dot product between the direction of the hand and the direction of the wrist. In order to detect the direction of the hand/wrist angle (whether upward or downward direction), the position of middle finger’s tip is compared with the position of middle finger’s metacarpal. If the tip position is greater than the metacarpal position then it’s an upward direction, otherwise it will be a downward direction. If an upward direction is detected and the hand/wrist angle reached or exceeded the <s-code>upwardThreshold</s-code>, then the classifier is activated (and the same goes with the downward direction). In order to have more accurate data from the leap, the hand should not be too close to the leap sensor, so before the classifier is activated such value is checked on. Also before everything, the detected hand must be the same as the <s-code>handType</s-code> (left or right). Such classifier also calculates how long the transition between the <s-code> upward and downward threshold</s-code> (and vice versa) is, discarding the time taken if the hand is not detected, the height of hand from leap is small or the hand types are not the same.
          <h1>Performance Metric</h1>
          This classifier includes no Performance Metric.
          <h1>Cheat Metric</h1>
          This classifier includes cheat metrics as stated in the Algorithm sub-section above. Those Metrics are (<s-code>height of the hand from the leap device</s-code>) and (<s-code>different hand type</s-code>).
          <h1>Room for Improvement</h1>
          The most fundamental flow currently is when the hand is kept on hold in the upwards or downwards direction for a long time, the leap sensor starts detecting wrong data.
        </section>
        <md-subheader>Classifier Settings</md-subheader>
        <md-divider></md-divider>
        <md-field>
          <label>Detection Upper Angle Threshold</label>
          <md-input v-model="upperAngleThreshold" type="number" />
        </md-field>

        <md-field>
          <label>Detection Lower Angle Threshold</label>
          <md-input v-model="lowerAngleThreshold" type="number" />
        </md-field>

        <div>
          <div class="md-subhead">Hand Type</div>
          <md-radio v-model="handType" @change="classifierSelectionUpdated" value="left">Left</md-radio>
          <md-radio v-model="handType" @change="classifierSelectionUpdated" value="right">Right</md-radio>
        </div>

        <br>

        <div>
          <div class="md-subhead">Difficulty</div>
          <md-radio v-model="difficulty" @change="classifierSelectionUpdated" value="easy">Easy</md-radio>
          <md-radio v-model="difficulty" @change="classifierSelectionUpdated" value="medium">Medium</md-radio>
          <md-radio v-model="difficulty" @change="classifierSelectionUpdated" value="hard">Hard</md-radio>
        </div>

      </md-card-content>
    </md-card>
</template>


<script lang="ts">
import Vue from "vue";
import { Observable } from "rxjs";
import { Inject, Component, Prop } from "vue-property-decorator";
import { Classifier, ClassifierRegistry } from "@/classify";

import GraphicalHandLogger from "@/ui/graphics/GraphicalHandLogger.vue";
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
    GraphicalHandLogger,
    "s-code": Code
  }
})
export default class WristAngleClassifier extends Vue {
  @Prop() public stream!: Observable<GenericHandTrackingData>;

  @Prop() public config!: any;

  public classifierSelectionUpdated() {
    this.$emit(EVT_CLASSIFIER_SEL_UPDATED, "WristAngleClassifier");
  }

  get upperAngleThreshold() {
    return this.config.upperAngleThreshold;
  }

  get lowerAngleThreshold() {
    return this.config.lowerAngleThreshold;
  }

  get handType() {
    return this.config.handType;
  }

  get difficulty() {
    return this.config.difficulty;
  }

  set lowerAngleThreshold(newValue: string) {
    modifyClassifier(this.$store, {
      name: "WristAngleClassifier",
      newState: { lowerAngleThreshold: newValue }
    });
    this.classifierSelectionUpdated();
  }

  set upperAngleThreshold(newValue: string) {
    modifyClassifier(this.$store, {
      name: "WristAngleClassifier",
      newState: { upperAngleThreshold: parseInt(newValue) }
    });
    this.classifierSelectionUpdated();
  }

  set handType(newValue: string) {
    modifyClassifier(this.$store, {
      name: "WristAngleClassifier",
      newState: { handType: newValue }
    });
    this.classifierSelectionUpdated();
  }

  set difficulty(newValue: string) {
    modifyClassifier(this.$store, {
      name: "WristAngleClassifier",
      newState: { difficulty: newValue }
    });
    this.classifierSelectionUpdated();
  }

  get wristAngleClassifierEnabled() {
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

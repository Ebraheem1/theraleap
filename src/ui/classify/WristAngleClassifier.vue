<template>
    <md-card>
      <md-card-header>
        <div class="md-title">Wrist Angle Classifier</div>
        <div class="md-subhead">Naive Spread detection soley based on virtualized Thumb position</div>
        <div class="enabled">
          <md-switch
            :value="!wristAngleClassifierEnabled"
            @change="classifierSelectionUpdated"
            class="md-accent">Enable</md-switch>
        </div>
      </md-card-header>

      <md-card-content>
        <md-subheader>Classifier Settings</md-subheader>
        <md-divider></md-divider>
        <md-field>
          <label>Detection Upper Angle Threshold</label>
          <md-input v-model="upperAngleThreshold" type="number" />
          <span class="md-helper-text">How generously to move forward with the detection. The bigger this number, the further the thumb has to be spread.</span>
        </md-field>

        <md-field>
          <label>Detection Lower Angle Threshold</label>
          <md-input v-model="lowerAngleThreshold" type="number" />
          <span class="md-helper-text">How generously to move forward with the detection. The bigger this number, the further the thumb has to be spread.</span>
        </md-field>

        <div>
          <div class="md-subhead">Hand Type</div>
          <md-radio v-model="handType" value="left">Left</md-radio>
          <md-radio v-model="handType" value="right">Right</md-radio>
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

  set lowerAngleThreshold(newValue: string) {
    modifyClassifier(this.$store, {
      name: "WristAngleClassifier",
      newState: { lowerAngleThreshold: parseInt(newValue) }
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

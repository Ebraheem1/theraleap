<template>
  <section id="GameList">
    <space-shooter></space-shooter>
    <space-ship v-if = "activeClassifier == 'ThumbIndexClassifier'"></space-ship>
    <super-mario v-if = "activeClassifier == 'WristAngleClassifier'"></super-mario>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Inject, Component, Prop } from "vue-property-decorator";
import * as classifier from "@/state/modules/classifiers";
import spaceShooter from "./game-descriptions/spaceShooter.vue";
import spaceShip from "./game-descriptions/spaceShip.vue";
import superMario from "./game-descriptions/superMario.vue";
import { ThumbIndexClassifierId } from "@/classify/classifiers/thumbindex";
import { WristAngleClassifierId } from "@/classify/classifiers/wristAngle";

import {
  getClassifiers,
  modifyClassifier,
  disableAllClassifiers,
  getActiveClassifier
} from "@/state/modules/classifiers";
import { getDeviceFacade } from "@/state/modules/device";

@Component({
  components: {
    spaceShooter,
    spaceShip,
    superMario
  }
})
export default class GameList extends Vue {
  public activeClassifier: string = "";

  public mounted() {
    var curr = localStorage.getItem("user");
    if (curr) {
      var json = JSON.parse(curr);
      if (json.enabled_gesture) {
        this.activeClassifier = json.enabled_gesture;
        this.classifierSelectionUpdated(
          json.enabled_gesture,
          json.TI_threshold,
          json.WA_thresholds,
          json.WA_handType
        );
      }
    }
  }

  //enabling the patient's classifier
  public classifierSelectionUpdated(
    activeClassifier: string,
    TI_threshold: Number,
    WA_thresholds: [Number],
    WA_handType: string
  ) {
    modifyClassifier(this.$store, {
      name: activeClassifier,
      newState: { enabled: true }
    });

    if (activeClassifier == "WristAngleClassifier") {
      modifyClassifier(this.$store, {
        name: activeClassifier,
        newState: { upperAngleThreshold: WA_thresholds[0] }
      });

      modifyClassifier(this.$store, {
        name: activeClassifier,
        newState: { lowerAngleThreshold: WA_thresholds[1] }
      });

      modifyClassifier(this.$store, {
        name: activeClassifier,
        newState: { handType: WA_handType }
      });
    } else if (activeClassifier == "ThumbIndexClassifier") {
      modifyClassifier(this.$store, {
        name: activeClassifier,
        newState: { threshold: TI_threshold }
      });
    }
    this.facade.updateClassifier(getActiveClassifier(this.$store));
  }

  get facade() {
    return getDeviceFacade(this.$store);
  }

  get classifierConfigState() {
    return getClassifiers(this.$store);
  }
  //end of enabling the patient's classifier

  // get spaceShipValidClassifiers() {
  //   if (classifier.getActiveClassifier(this.$store) !== undefined) {
  //     var validClassifiers = [ThumbIndexClassifierId];
  //     var activeClassifier = classifier.getActiveClassifier(this.$store)
  //       .identifier;
  //     console.log("space");
  //     console.log("valid",validClassifiers);
  //     console.log("active",activeClassifier);
  //     return validClassifiers.includes(activeClassifier);
  //   }
  //   return true;
  // }
  //
  // get superMarioValidClassifiers() {
  //   if (classifier.getActiveClassifier(this.$store) !== undefined) {
  //     var validClassifiers = [WristAngleClassifierId];
  //     var activeClassifier = classifier.getActiveClassifier(this.$store)
  //       .identifier;
  //       console.log("wrist");
  //       console.log("valid",validClassifiers);
  //       console.log("active",activeClassifier);
  //     return validClassifiers.includes(activeClassifier);
  //   }
  //   return true;
  // }
}
</script>

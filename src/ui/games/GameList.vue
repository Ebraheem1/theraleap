<template>
  <section id="GameList">
    <space-shooter></space-shooter>
    <space-ship v-if="spaceShipValidClassifiers"></space-ship>
    <super-mario v-if="superMarioValidClassifiers"></super-mario>
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

@Component({
  components: {
    spaceShooter,
    spaceShip,
    superMario
  }
})
export default class GameList extends Vue {
  get spaceShipValidClassifiers() {
    var validClassifiers = [ThumbIndexClassifierId];
    var activeClassifier = classifier.getActiveClassifier(this.$store)
      .identifier;
    return validClassifiers.includes(activeClassifier);
  }

  get superMarioValidClassifiers() {
    var validClassifiers = [WristAngleClassifierId];
    var activeClassifier = classifier.getActiveClassifier(this.$store)
      .identifier;
    return validClassifiers.includes(activeClassifier);
  }
}
</script>

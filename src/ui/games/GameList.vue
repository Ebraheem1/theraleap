<template>
    <section id="GameList">
    <space-shooter></space-shooter>
    <space-ship v-if="spaceShipValidClassifiers"></space-ship>
    </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Inject, Component, Prop } from "vue-property-decorator";
import * as classifier from "@/state/modules/classifiers";
import spaceShooter from "./game-descriptions/spaceShooter.vue";
import spaceShip from "./game-descriptions/spaceShip.vue";
import { ThumbIndexClassifierId } from "@/classify/classifiers/thumbindex";

@Component({
  components: {
    spaceShooter,
    spaceShip
  }
})
export default class GameList extends Vue {
  get spaceShipValidClassifiers() {
    var validClassifiers = [ThumbIndexClassifierId];
    var activeClassifier = classifier.getActiveClassifier(this.$store)
      .identifier;
    return validClassifiers.includes(activeClassifier);
  }
}
</script>

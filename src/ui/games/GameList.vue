<template>
    <section id="GameList">
    <space-shooter></space-shooter>
    <space-ship></space-ship>
    </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Inject, Component, Prop } from "vue-property-decorator";

import spaceShooter from "./game-descriptions/spaceShooter.vue";
import spaceShip from "./game-descriptions/spaceShip.vue";

@Component({
  components: {
    spaceShooter,
    spaceShip
  }
})
export default class GameList extends Vue {}
</script>

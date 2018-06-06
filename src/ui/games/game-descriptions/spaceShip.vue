<template>
<md-card>
      <md-card-media>
      </md-card-media>

      <md-card-header>
        <div class="md-title">Space Ship</div>
        <div class="md-subhead">Destroy evil space Crafts and meteors with the epic power of your hand!</div>
      </md-card-header>

      <md-card-content>
        <md-subheader>Game Description</md-subheader>
        <section>
            Move the Spaceship by hovering the hand over the sensor. The therapist will show you the Gesture you need to do in order to shoot the spaceship.
        </section>
      </md-card-content>
      <md-card-actions>
        <play-button-motion-tracking
        @click="play('space-ship')" />
      </md-card-actions>
</md-card>
</template>
<script lang="ts">
import Vue from "vue";
import { Inject, Component, Prop } from "vue-property-decorator";
import PlayButtonMotionTracking from "@/ui/games/PlayButtonMotionTracking.vue";
import { ThumbIndexClassifierId } from "@/classify/classifiers/thumbindex";
@Component({
  components: {
    PlayButtonMotionTracking
  }
})
export default class spaceShip extends Vue {
  public play(id: string) {
    this.$router.push(`/games/play/${id}`);
  }
}
</script>

<style lang="scss" scoped>
.md-card {
  max-width: 500px;
}
</style>

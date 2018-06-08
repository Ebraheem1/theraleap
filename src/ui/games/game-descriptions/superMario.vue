<template>
  <md-card>
    <md-card-media>
    </md-card-media>

    <md-card-header>
      <div class="md-title">Super Mario</div>
      <div class="md-subhead">Help Mario to save Princess Toadstool from Bowser by reaching the destination!</div>
    </md-card-header>

    <md-card-content>
      <md-subheader>Game Description</md-subheader>
      <section>
          Move Mario either upwards or downwards to obtain more gifts in order to reach the destination. Also try to avoid the obstacles in order not to lose. The therapist will show you the Gesture you need to move Mario up or down.
      </section>
    </md-card-content>
    <md-card-actions>
      <play-button-motion-tracking @click="play('super-mario')" />
    </md-card-actions>
  </md-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Inject, Component, Prop } from "vue-property-decorator";
import PlayButton from "@/ui/games/PlayButton.vue";
import PlayButtonMotionTracking from "@/ui/games/PlayButtonMotionTracking.vue";

@Component({
  components: {
    PlayButton,
    PlayButtonMotionTracking
  }
})
export default class superMario extends Vue {
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

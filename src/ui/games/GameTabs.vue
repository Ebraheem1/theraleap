<template>
    <md-tabs class="md-primary" md-sync-route v-if="userType == '2'">
        <md-tab md-label="Game List" to="/games/list"></md-tab>
        <!-- <md-tab md-label="Settings" to="/games/settings"></md-tab> -->
        <md-tab id="tab-posts" md-label="Logout" to="/logout"></md-tab>
    </md-tabs>
</template>
<script lang="ts">
import Vue from "vue";
import * as user from "@/state/modules/user";
import { Inject, Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class GameTabs extends Vue {
  get userType(): string {
    return user.getUserType(this.$store);
  }
}
</script>

<template>
    <md-tabs class="md-primary" md-sync-route>
        <md-tab id="tab-home" md-label="Patient Login" to="/patient/patient_login" v-if="userType == '0'"></md-tab>
    </md-tabs>
</template>
<script lang="ts">
import Vue from "vue";
import { Inject, Component } from "vue-property-decorator";
import * as user from "@/state/modules/user";

@Component({
  components: {}
})
export default class PatientTabs extends Vue {
  get userType(): string {
    return user.getUserType(this.$store);
  }
}
</script>
<style lang="scss">
</style>

<template>
    <md-tabs class="md-primary" md-sync-route>
        <md-tab id="tab-home" md-label="Invite Therapist" to="/therapist/add"
        v-if="userType == '1'"></md-tab>
        <!-- <md-tab id="tab-pages" md-label="Add Patient" to="/therapist/add_patient"
        v-if="userType == '1'"></md-tab> -->
        <md-tab id="tab-posts" md-label="Therapist Login" to="/therapist/login_therapist"></md-tab>
        <md-tab id="tab-posts" md-label="Logout" to="/logout" 
        v-if="userType == '1'"></md-tab>
        <!-- <md-tab id="tab-posts" md-label="View Patients" to="/therapist/view_patients"></md-tab> -->
    </md-tabs>
</template>
<script lang="ts">
import Vue from "vue";
import * as user from "@/state/modules/user";
import { Inject, Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class TherapistTabs extends Vue {
  get userType(): string {
    return user.getUserType(this.$store);
  }
}
</script>
<style lang="scss">
</style>

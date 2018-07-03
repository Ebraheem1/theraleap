<template>
    <md-tabs class="md-primary" md-sync-route>
        <md-tab id="tab-add" md-label="Invite Therapist" to="/therapist/add"></md-tab>
        <md-tab id="tab-addpatient" md-label="Add Patient" to="/therapist/add_patient"></md-tab>
        <md-tab id="tab-viewpatient" md-label="Your Patients" to="/therapist/view_patients"
        ></md-tab>
        <md-tab id="tab-login" md-label="Therapist Login" to="/therapist/login_therapist"></md-tab>
        <md-tab id="tab-logout" md-label="Logout" to="/logout"></md-tab>
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

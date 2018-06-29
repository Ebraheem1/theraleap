<template>
    <md-tabs class="md-primary" md-sync-route>
        <md-tab id="tab-home" md-label="Invite Therapist" to="/therapist/add"></md-tab>
        <md-tab id="tab-pages" md-label="Add Patient" to="/therapist/add_patient"></md-tab>
        <md-tab id="tab-posts" md-label="Login" to="/therapist/login_therapist"></md-tab>
        <!-- <md-tab id="tab-posts" md-label="View Patients" to="/therapist/view_patients"></md-tab> -->
    </md-tabs>
</template>
<script lang="ts">
import Vue from "vue";
import { Inject, Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class TherapistTabs extends Vue {}
</script>
<style lang="scss">
</style>

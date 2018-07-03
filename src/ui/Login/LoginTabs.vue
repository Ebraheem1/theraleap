<template>
    <md-tabs class="md-primary" md-sync-route>
        <md-tab id="tab-patient" md-label="Patient Login" to="/login/login_patient" v-if="userType == '0'"></md-tab>
        <md-tab id="tab-therapist" md-label="Therapist Login" to="/login/login_therapist" v-if="userType == '0'"></md-tab>
    </md-tabs>
</template>
<script lang="ts">
import Vue from "vue";
import { Inject, Component } from "vue-property-decorator";
import * as user from "@/state/modules/user";
@Component({
  components: {}
})
export default class LoginTabs extends Vue {
  get userType(): string {
    return user.getUserType(this.$store);
  }
}
</script>

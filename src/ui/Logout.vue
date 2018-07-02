
<template>
</template>
<script lang = "ts">
import Vue from "vue";
import * as user from "@/state/modules/user";
import { Component } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Logout extends Vue {
  public mounted() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    user.setUserType(this.$store, "0");
    this.$router.push({
      name: "device-log"
    });
  }
}
</script>

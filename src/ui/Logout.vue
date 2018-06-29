
<template>
</template>
<script lang = "ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Logout extends Vue {
  public mounted() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.$router.push({
      name: "device-log"
    });
  }
}
</script>

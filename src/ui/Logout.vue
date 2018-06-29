
<template>
<h1>dsadsadsadsadsadsad</h1>
</template>
<script lang = "ts">
import Vue from "vue";
export default class Logout extends Vue {
  mounted() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("Done");
    // this.$router.push({
    //     name: "device-log"
    // });
  }
}
</script>

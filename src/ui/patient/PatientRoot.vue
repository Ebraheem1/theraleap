<template>
  <router-view></router-view>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class PatientRoot extends Vue {}
</script>

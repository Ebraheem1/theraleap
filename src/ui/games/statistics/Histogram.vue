<template>
    <section>
            {{ titleCheck }}
            <div id="histogram" v-bind="styles"></div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Inject, Component, Prop } from "vue-property-decorator";
import * as c3 from "c3";

@Component({
  components: {}
})
export default class ScatterPlot extends Vue {
  @Prop({ required: true })
  public columns!: any[];

  @Prop({ type: String, required: true })
  public identifier!: string;

  styles = {
    width: "90%",
    height: "60%"
  };

  get titleCheck() {
    if (this.identifier == "TI-LEAP") {
      return "Fingers (Thumb-Index Angles),DM (Distal-Medial Angles), PM(Proximal-Medial Angles) only accurate frames are considered";
    }
  }
  public drawTIHistogram() {
    var thumbIndexAngleCount = Array(37).fill(0);
    var distalMedialCount = Array(37).fill(0);
    var proximalMedialCount = Array(37).fill(0);
    thumbIndexAngleCount[0] = "Fingers";
    distalMedialCount[0] = "DM";
    proximalMedialCount[0] = "PM";
    for (var i = 0; i < this.columns[0].length; i++) {
      thumbIndexAngleCount[Math.ceil(this.columns[0][i] / 5)]++;
    }
    for (var i = 0; i < this.columns[1].length; i++) {
      distalMedialCount[Math.ceil(this.columns[1][i] / 5)]++;
    }
    for (var i = 0; i < this.columns[2].length; i++) {
      proximalMedialCount[Math.ceil(this.columns[2][i] / 5)]++;
    }
    // xAxis array is the angles.
    // the first cell contains the name that represents the x-axis.
    var xAxis = [];
    xAxis.push("Angles");
    // each point in x-axis is the [angle, angle+4] where angle is divisible by 5
    for (var i = 1; i < 180; i += 5) {
      var s = i + " to " + (i + 4);
      xAxis.push(s);
    }
    // removes the angles that was never reached by the patient
    for (var i = 1; i < 37; i++) {
      var condition =
        thumbIndexAngleCount[i] == 0 &&
        distalMedialCount[i] == 0 &&
        proximalMedialCount[i] == 0;
      if (condition) {
        thumbIndexAngleCount.splice(i, 1);
        distalMedialCount.splice(i, 1);
        proximalMedialCount.splice(i, 1);
        xAxis.splice(i, 1);
        i--;
      }
    }
    var histoDiv = this.$el.querySelector("div");
    if (histoDiv) {
      var chart = c3.generate({
        bindto: histoDiv,
        data: {
          columns: [
            thumbIndexAngleCount,
            distalMedialCount,
            proximalMedialCount
          ],
          type: "bar",
          colors: {
            Fingers: "#ff0000",
            DM: "#00ff00",
            PM: "#0000ff"
          }
        },
        axis: {
          x: {
            type: "category",
            categories: xAxis,
            label: "Angles"
          },
          y: {
            label: "Count"
          }
        }
      });
    }
  }

  public mounted() {
    if (this.identifier == "TI-LEAP") {
      this.drawTIHistogram();
    }
  }
}
</script>

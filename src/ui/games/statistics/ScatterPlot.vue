<template>
    <section>
            {{ titleCheck }}
            <div id="scatter-plot" v-bind="styles"></div>
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

  public labelX!: string;

  public labelY!: string;

  @Prop({ type: String, required: true })
  public identifier!: string;
  styles = {
    width: "90%",
    height: "60%"
  };

  get titleCheck() {
    if (this.identifier == "TI-LEAP") {
      return "Angles between Thumb and Index in the valid frames";
    } else if (this.identifier == "WA-LEAP") {
      return "Wrist Angles in Accurate frames";
    }
  }
  public drawScatterTI() {
    this.labelX = "Ordered Frames";
    this.labelY = "Angles";
    this.columns.unshift("Angles");
    var scatterPlot = this.$el.querySelector("div");
    if (scatterPlot) {
      var scatterChart = c3.generate({
        bindto: scatterPlot,
        data: {
          columns: [this.columns],
          type: "scatter"
        },
        axis: {
          x: {
            label: this.labelX,
            tick: {
              fit: false
            }
          },
          y: {
            label: this.labelY
          }
        }
      });
    }
  }

  public mounted() {
    if (this.identifier == "TI-LEAP" || this.identifier == "WA-LEAP") {
      this.drawScatterTI();
    }
  }
}
</script>

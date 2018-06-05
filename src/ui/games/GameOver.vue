<template>
    <section id="GameOver">
        <section class="game-over-message">
            <h1>{{ headerText[0] }}</h1>
            <h2>{{ headerText[1] }}</h2>
            <span>
                <play-button :name="'Retry'" @click="$router.push(`/games/play/${gameIdentifier}`)"></play-button>
            </span>
        </section>
        <md-divider />
        <section v-if="score !== undefined" class="highscore">
            Your final Score: <s-code>{{ score.toString().padStart(5, '0') }}</s-code> points.
        </section>
        <section v-if="data !== undefined" class="highscore">
            Your time to reach Threshold: <s-code>{{ data[2].toString().padStart(5, '0') }}</s-code> sec(s).
        </section>
        <scatter-plot v-if="chartAppearance"
        :columns="scatterColumns" :identifier="identifierChange"></scatter-plot>
        <histogram v-if="chartAppearance"
        :columns="histogramColumns"
        :identifier="identifierChange"></histogram>
        <section v-if="statistics !== undefined">
          Your Thumb Positions throughout the Game: (GUC Students, your turn!)
          <svg ref="svg" width="500" height="430">
            <g style="transform: translate(30, 0); stroke: black;">
              <path class="line" :d="line" />
            </g>
          </svg>
        </section>
    </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Inject, Component, Prop, Watch } from "vue-property-decorator";
import * as d3 from "d3";
import { GenericHandTrackingData } from "@/devices";
import PlayButton from "@/ui/games/PlayButton.vue";
import Code from "@/ui/utils/Code.vue";
import ScatterPlot from "@/ui/games/statistics/ScatterPlot.vue";
import Histogram from "@/ui/games/statistics/Histogram.vue";
import { LeapHandTrackingData, LeapPointable } from "devices/leapmotion";

const getPointableWithId = (
  p: LeapPointable[],
  type: number
): LeapPointable | undefined => {
  let target = undefined;
  p.forEach(pointable => {
    if (pointable.type === type) {
      target = pointable;
      return;
    }
  });
  return target;
};

@Component({
  components: {
    PlayButton,
    "s-code": Code,
    "scatter-plot": ScatterPlot,
    histogram: Histogram
  }
})
export default class GameOver extends Vue {
  @Prop({ type: String, required: true })
  public gameIdentifier!: string;

  @Prop({ type: Number, required: false })
  public score: number | undefined;

  @Prop({ type: Array, required: false })
  public statistics: GenericHandTrackingData[] | undefined;

  public line: string | null = null;

  @Prop({ type: Array, required: false })
  public data: any[] | undefined;

  get headerText() {
    if (this.data !== undefined && this.data[1]) {
      return ["Congratulations!", "Good Job!"];
    }
    return ["You Lose!", "Better Luck next time!"];
  }

  get scatterColumns() {
    if (this.data !== undefined && this.data[0] == "TI-LEAP") {
      return this.data[3];
    }
  }

  get histogramColumns() {
    if (this.data !== undefined && this.data[0] == "TI-LEAP") {
      return [this.data[4], this.data[5], this.data[6]];
    }
  }

  get identifierChange() {
    if (this.data !== undefined && this.data[0] == "TI-LEAP") {
      return this.data[0];
    }
  }

  get chartAppearance() {
    if (
      this.data !== undefined &&
      this.data[0] == "TI-LEAP" &&
      this.data[3].length > 2
    ) {
      return true;
    }
    return false;
  }

  public mounted() {
    if (this.data !== undefined) {
      if (this.data[0] == "TI-LEAP") {
      }
    } else if (this.statistics) {
      const p: { data: number; index: number }[] = [];
      this.statistics.forEach((d: LeapHandTrackingData, idx) => {
        const pointable = getPointableWithId(d.data.pointables, 0);
        if (pointable !== undefined) {
          p.push({
            data: pointable.tipPosition[0],
            index: idx
          });
        }
      });
      const x = d3.scaleLinear().range([0, 500]);
      const y = d3.scaleLinear().range([300, 0]);
      const thumbPosLine = d3
        .line<{ data: number; index: number }>()
        .x(d => x(d.index))
        .y(d => y(d.data));

      x.domain([0, p.length]);
      y.domain([-200, 200]);
      this.line = thumbPosLine(p);

      const svg = d3.select(this.$refs.svg as d3.BaseType);

      svg
        .append("g")
        .attr("transform", "translate(30, 0)")
        // @ts-ignore
        .call(d3.axisLeft(y));

      svg
        .append("g")
        .attr("transform", "translate(30, 220)")
        // @ts-ignore
        .call(d3.axisBottom(x));
    }
  }
}
</script>
<style lang="scss" scoped>
.game-over-message {
  text-align: center;
  h1 {
    font-size: 2em;
    margin: 15px 0 0 0;
  }
  h2 {
    font-size: 1em;
  }
}
.md-divider {
  margin-top: 25px;
}
.highscore {
  margin: 25px;
  font-size: larger;
}
.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
</style>

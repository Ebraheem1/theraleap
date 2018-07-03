<template>
    <section id="GameOver">
        <section class="game-over-message">
            <h1>{{ headerText[0] }}</h1>
            <h2>{{ headerText[1] }}</h2>
            <span>
                <play-button :name="'Retry'" @click="$router.push(`/games`)"></play-button>
            </span>
        </section>
        <md-divider />
        <section v-if="score !== undefined" class="highscore">
            Your final Score: <s-code>{{ score.toString().padStart(5, '0') }}</s-code> points.
        </section>
        <section v-if="showTime" class="highscore">
            Your time to reach Threshold: <s-code>{{ data[2].toString().padStart(5, '0') }}</s-code> sec(s).
        </section>
        <section v-if="showUpwardsAngle" class="highscore">
            Your maximum angle reached Upwards: <s-code>{{ Number.parseFloat(data[3]).toPrecision(4) }}</s-code> degrees.
        </section>
        <section v-if="showDownwardsAngle" class="highscore">
            Your maximum angle reached Downwards: <s-code>{{ Number.parseFloat(data[4]).toPrecision(4) }}</s-code> degrees.
        </section>
        <scatter-plot v-if="scatterAppearance"
        :columns="scatterColumns" :identifier="identifierChangeScatter"></scatter-plot>
        <histogram v-if="histogramAppearance"
        :columns="histogramColumns"
        :identifier="identifierChangeHistogram"></histogram>
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
import axios from "axios";
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

  get showTime() {
    if (
      this.data !== undefined &&
      (this.data[0] == "TI-LEAP" || this.data[0] == "WA-LEAP") &&
      this.data[2] > 0
    )
      return true;
    return false;
  }

  get showUpwardsAngle() {
    if (
      this.data !== undefined &&
      this.data[0] == "WA-LEAP" &&
      this.data[3] > 0
    )
      return true;
    return false;
  }

  get showDownwardsAngle() {
    if (
      this.data !== undefined &&
      this.data[0] == "WA-LEAP" &&
      this.data[4] > 0
    )
      return true;
    return false;
  }

  get scatterColumns() {
    if (this.data !== undefined) {
      if (this.data[0] == "TI-LEAP") return this.data[3];
      if (this.data[0] == "WA-LEAP") {
        return this.data[5];
      }
    }
  }

  get histogramColumns() {
    if (this.data !== undefined && this.data[0] == "TI-LEAP") {
      return [this.data[4], this.data[5], this.data[6]];
    }
  }

  get identifierChangeScatter() {
    if (
      this.data !== undefined &&
      (this.data[0] == "TI-LEAP" || this.data[0] == "WA-LEAP")
    ) {
      return this.data[0];
    }
  }

  get identifierChangeHistogram() {
    if (this.data !== undefined && this.data[0] == "TI-LEAP") {
      return this.data[0];
    }
  }

  get scatterAppearance() {
    if (
      this.data !== undefined &&
      ((this.data[0] == "TI-LEAP" && this.data[3].length > 2) ||
        (this.data[0] == "WA-LEAP" && this.data[5].length > 2))
    ) {
      return true;
    }
    return false;
  }

  get histogramAppearance() {
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
    var curr = localStorage.getItem("user");
    if (curr != null && this.data !== undefined) {
      var json = JSON.parse(curr);
      var stats: any = {};

      stats.winning_flag = this.data[1];
      stats.max_time = this.data[2];
      stats.patient_id = json.id;
      stats.therapist_id = json.therapist_id;
      if (this.data[0] == "TI-LEAP") {
        stats.classifier_name = "ThumbIndexClassifier";
        stats.scatter_TI = this.data[3].slice(1);
        stats.histogram_TI = this.histogramColumns;
      } else if (this.data[0] == "WA-LEAP") {
        stats.classifier_name = "WristAngleClassifier";
        stats.max_angle_upwards = this.data[3];
        stats.max_angle_downwards = this.data[4];
        stats.scatter_WA = this.data[5].slice(1);
      }

      console.log(stats);

      let uri = "http://localhost:4000/statistic/create";
      axios
        .post(uri, stats, {
          headers: { "x-access-token": localStorage.getItem("token") }
        })
        .then(response => {
          if (response.data.success) {
            console.log("statistics saved");
          }
        })
        .catch(err => {
          // this.error = true;
          console.log(err);
          if (err.response.data) console.log(err.response.data.message);
        });
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

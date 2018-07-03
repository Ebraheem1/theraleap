<template>
  <section>
    <md-card md-with-hover>
      <md-card-header class="header-flex-container">
        <section class="header-left">
          <div class="md-title">{{ currentPatient.name }}</div>
        </section>
      </md-card-header>
      <md-card-content>
        <div class="container">
          <div class="form">
            <span class="md-invalid" v-if="error" style="color:red">{{ errorMessage }}</span>
            <md-field v-if="currentPatient">
              <label>{{ currentPatient.name }}</label>
              <md-input v-model="currentPatient.name"></md-input>
              <span class="md-helper-text">Name</span>
            </md-field>
            <md-field  v-if="currentPatient">
              <label>{{ currentPatient.email }}</label>
              <md-input v-model="currentPatient.email"></md-input>
              <span class="md-helper-text">Email</span>
            </md-field>
            <md-field>
              <label v-if="currentPatient.TI_threshold">{{ currentPatient.TI_threshold }}</label>
              <label v-else>NA</label>
              <md-input v-model="currentPatient.TI_threshold"></md-input>
              <span class="md-helper-text">Thumb Index Threshold Angle</span>
            </md-field>
            <md-field>
              <label v-if="(currentPatient.WA_thresholds) && (currentPatient.WA_thresholds.length > 0)">
                  {{ currentPatient.WA_thresholds[0] }}</label>
              <label v-else>NA</label>
              <md-input v-model="currentPatient.up"></md-input>
              <span class="md-helper-text">Wrist Angle Upward Threshold</span>
            </md-field>
            <md-field>
              <label v-if="currentPatient.WA_thresholds && currentPatient.WA_thresholds.length > 0">
                  {{ currentPatient.WA_thresholds[1] }}</label>
              <label v-else>NA</label>
              <md-input v-model="currentPatient.down"></md-input>
              <span class="md-helper-text">Wrist Angle Downward Threshold</span>
            </md-field>
            <div>
                <div class="md-subhead">Hand Type</div>
                <md-radio v-model="currentPatient.WA_handType" @change="handTypeChange" value="left">Left</md-radio>
                <md-radio v-model="currentPatient.WA_handType" @change="handTypeChange" value="right">Right</md-radio>
            </div>
            <div>
                <div class="md-subhead">Difficulty Level in WristAngle Classifier</div>
                <md-radio v-model="currentPatient.WA_difficulty" @change="difficultyChange" value="easy">Easy</md-radio>
                <md-radio v-model="currentPatient.WA_difficulty" @change="difficultyChange" value="medium">Medium</md-radio>
                <md-radio v-model="currentPatient.WA_difficulty" @change="difficultyChange" value="hard">Hard</md-radio>
            </div>
            <div>
                <div class="md-subhead">Difficulty Level in WristAngle Classifier</div>
                <md-radio v-model="currentPatient.enabled_gesture" @change="classifierChange" value="WristAngleClassifier">Wrist Angle</md-radio>
                <md-radio v-model="currentPatient.enabled_gesture" @change="classifierChange" value="ThumbIndexClassifier">Thumb Index</md-radio>            </div>
          </div>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button
          @click="editPatientData"
          class="md-raised md-primary">EDIT</md-button>
      </md-card-actions>
    </md-card>
    <md-snackbar :md-active.sync="editSaved">Modifications are saved!</md-snackbar>
    <!-- Here is the part of Statistics -->
   <section v-if="statisticsSection">
      <md-card v-for="graph in graphsArr" :key="graph._id">
      <scatter-plot v-if="graph.identifier == 'TI-LEAP'" :columns="graph.scatter_TI"
      :identifier="graph.identifier"></scatter-plot>
      <histogram v-if="graph.identifier == 'TI-LEAP'"
        :columns="graph.histogram_TI"
        :identifier="graph.identifier"></histogram>
      <scatter-plot v-if="graph.identifier == 'WA-LEAP'" :columns="graph.scatter_WA"
      :identifier="graph.identifier"></scatter-plot>
      </md-card>
   </section>
  </section>
</template>
<script>
import ScatterPlot from "@/ui/games/statistics/ScatterPlot.vue";
import Histogram from "@/ui/games/statistics/Histogram.vue";
export default {
  components: {
    "scatter-plot": ScatterPlot,
    histogram: Histogram
  },
  props: ["patient"],
  computed: {
    getPatient: function() {
      if (this.patient) {
        return this.patient;
      }
      return undefined;
    }
  },
  data() {
    return {
      error: false,
      currentPatient: {},
      editSaved: false,
      statisticsSection: false,
      graphsArr: []
    };
  },
  created: function() {
    this.currentPatient = this.getPatient;
    if (this.currentPatient === undefined) {
      this.$router.push({
        name: "view-all"
      });
    }
    this.getStatistics();
  },
  methods: {
    handTypeChange(val) {
      this.currentPatient.WA_handType = val;
    },
    difficultyChange(val) {
      this.currentPatient.WA_difficulty = val;
    },
    classifierChange(val) {
      this.currentPatient.enabled_gesture = val;
    },
    getStatistics() {
      if (!this.currentPatient.enabled_gesture) {
        return;
      }
      let uri =
        "http://localhost:4000/therapist/get-statistics/" +
        this.currentPatient.id +
        "/" +
        this.currentPatient.enabled_gesture;
      this.axios
        .get(uri, {
          headers: { "x-access-token": localStorage.getItem("token") }
        })
        .then(response => {
          if (response.data.success) {
            console.log(response.data);
            if (response.data.graphs && response.data.graphs.length > 0) {
              var count = 0;
              this.statisticsSection = true;
              this.graphsArr = response.data.graphs;
              for (var i = 0; i < this.graphsArr.length; i++) {
                count++;
                if (
                  this.graphsArr[i].classifier_name == "ThumbIndexClassifier"
                ) {
                  this.graphsArr[i].identifier = "TI-LEAP";
                } else {
                  this.graphsArr[i].identifier = "WA-LEAP";
                }
              }
              if (count == 0) {
                this.statisticsSection = false;
              }
            }
          }
        })
        .catch(err => {
          console.log("err: ", err.response);
        });
    },
    editPatientData() {
      if (this.currentPatient.up == null) {
        this.currentPatient.up = this.currentPatient.WA_thresholds[0];
      }
      if (this.currentPatient.down == null) {
        this.currentPatient.down = this.currentPatient.WA_thresholds[1];
      }
      var newPatient = {
        name: this.currentPatient.name,
        email: this.currentPatient.email,
        enabled_gesture: this.currentPatient.enabled_gesture,
        TI_threshold: parseFloat(this.currentPatient.TI_threshold),
        WA_thresholds: [
          parseFloat(this.currentPatient.up),
          parseFloat(this.currentPatient.down)
        ],
        WA_handType: this.currentPatient.WA_handType,
        WA_difficulty: this.currentPatient.WA_difficulty,
        id: this.currentPatient.id
      };
      let uri = "http://localhost:4000/therapist/edit-patient";
      this.axios
        .post(uri, newPatient, {
          headers: { "x-access-token": localStorage.getItem("token") }
        })
        .then(response => {
          if (response.data.success) {
            this.editSaved = true;
          }
        })
        .catch(err => {
          if (err) {
            console.log("err", err.message);
          }
        });
    }
  }
};
</script>

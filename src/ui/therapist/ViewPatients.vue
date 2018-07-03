
<template>
  <section v-if="patients.length > 0">
    <md-card v-for="patient of patients" :key="patient.id" >
      <md-card-header>
        <div :id="patient.id" class="md-title" v-on:click="select($event)" >{{ patient.name }}</div>
        <div class="md-subhead" v-if="patient.enabled_gesture">{{ patient.enabled_gesture }}</div>
        <div class="md-subhead" v-if="! patient.enabled_gesture">No enabled Classifier for this patient</div>
      </md-card-header>
      <md-card-actions>
      </md-card-actions>
    </md-card>
  </section>
  <section v-else class="game-over-message">
            <h1>{{ message }}</h1>
  </section>

</template>
<script>
export default {
  data() {
    return {
      patients: [],
      message: null
    };
  },
  created: function() {
    this.fetchPatients();
  },
  methods: {
    fetchPatients() {
      let uri = "http://localhost:4000/therapist/view-patients";
      this.axios
        .get(uri, {
          headers: { "x-access-token": localStorage.getItem("token") }
        })
        .then(response => {
          this.patients = response.data.patients;
          if (this.patients.length == 0) {
            this.message = "You do not have patients yet";
          } else {
            this.message = null;
          }
        })
        .catch(err => {
          this.patients = [];
          this.message = err.response.data.message;
        });
    },
    select(event) {
      var clickedId = event.currentTarget.id;
      var clickedPatient = undefined;
      for (var i = 0; i < this.patients.length; i++) {
        if (this.patients[i].id == clickedId) {
          clickedPatient = this.patients[i];
          break;
        }
      }
      if (clickedPatient.id)
        this.$router.push(`/therapist/patient_data/${clickedPatient.id}`);
    }
  }
};
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


























<!--  -->

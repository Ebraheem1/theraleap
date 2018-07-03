
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
</template>
<script>
export default {
  data() {
    return {
      patients: []
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
        })
        .catch(err => {
          this.patients = [];
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
      this.$router.push({
        name: "patient-data",
        params: {
          patient: clickedPatient
        }
      });
    }
  }
};
</script>



























<!--  -->

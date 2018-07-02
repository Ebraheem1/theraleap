
<template>
  <section>
    <md-card md-with-hover>
      <md-card-header class="header-flex-container">
        <section class="header-left">
          <div class="md-title">Add A Patient</div>
        </section>
      </md-card-header>
      <md-card-content>
        <div class="container">
          <div class="form">
            <md-field>
              <label>Name</label>
              <md-input v-model="patient.name"></md-input>
            </md-field>
            <md-field>
              <label>Email</label>
              <md-input v-model="patient.email"></md-input>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input v-model="patient.password" type="password"></md-input>
            </md-field>
          </div>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button
          @click="createPatient"
          class="md-raised md-primary">Save</md-button>
      </md-card-actions>
    </md-card>
  </section>
</template>
<script>
export default {
  data() {
    return {
      patient: {}
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    createPatient() {
      let uri = "http://localhost:4000/therapist/create_patient";

      this.axios
        .post(uri, this.patient, {
          headers: { "x-access-token": localStorage.getItem("token") }
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>



























<!--  -->

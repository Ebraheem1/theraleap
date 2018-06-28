
<template>
  <section>
    <md-card md-with-hover>
      <md-card-header class="header-flex-container">
        <section class="header-left">
          <div class="md-title">Invite A Therapist</div>
        </section>
      </md-card-header>
      <md-card-content>
        <div class="container">
          <div class="form">
            <span class="md-invalid" v-if="error" style="color:red">{{ errorMessage }}</span>
            <md-field>
              <label>Name</label>
              <md-input v-model="therapist.name"></md-input>
            </md-field>
            <md-field>
              <label>Email</label>
              <md-input v-model="therapist.email"></md-input>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input v-model="therapist.password" type="password"></md-input>
            </md-field>
          </div>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button
          @click="createTherapist"
          class="md-raised md-primary">Save</md-button>
      </md-card-actions>
    </md-card>
    <md-snackbar :md-active.sync="userSaved">The therapist {{ name }} was added with success!</md-snackbar>
  </section>
</template>
<script>
export default {
  data: () => ({
    therapist: {},
    userSaved: false,
    name: null,
    error: false,
    errorMessage: null
  }),
  methods: {
    createTherapist() {
      let uri = "http://localhost:4000/therapist/create";
      this.axios
        .post(uri, this.therapist)
        .then(response => {
          this.userSaved = true;
          this.name = this.therapist.name;
          this.therapist = {};
          this.error = false;
          this.errorMessage = null;
        })
        .catch(err => {
          this.error = true;
          this.errorMessage = err.response.data;
          // console.log(err.response.data);
        });
    }
  }
};
</script>



























<!--  -->

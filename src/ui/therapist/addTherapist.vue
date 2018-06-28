
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
  </section>
</template>
<script>
export default {
  data() {
    return {
      therapist: {}
    };
  },
  methods: {
    createTherapist() {
      let uri = "http://localhost:4000/therapist/create";
      this.axios
        .post(uri, this.therapist)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  }
};
</script>



























<!--  -->

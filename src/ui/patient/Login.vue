
<template>
  <section>
    <md-card md-with-hover>
      <md-card-header class="header-flex-container">
        <section class="header-left">
          <div class="md-title">Patient login</div>
        </section>
      </md-card-header>
      <md-card-content>
        <div class="container">
          <div class="form">
            <span class="md-invalid" v-if="error" style="color:red">{{ errorMessage }}</span>
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
          @click="loginTherapist"
          class="md-raised md-primary">Login</md-button>
      </md-card-actions>
    </md-card>
  </section>
</template>
<script>
export default {
  data: () => ({
    patient: {},
    userSaved: false,
    name: null,
    error: false,
    errorMessage: null
  }),
  methods: {
    loginTherapist() {
      let uri = "http://localhost:4000/patient/login";
      this.axios
        .post(uri, this.patient)
        .then(response => {
          if (response.data.success) {
            console.log(response.data.user);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
        })
        .catch(err => {
          this.error = true;
          this.errorMessage = err.response.data.message;
        });
    }
  }
};
</script>



























<!--  -->

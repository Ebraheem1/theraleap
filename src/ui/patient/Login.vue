
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
          @click="loginPatient"
          class="md-raised md-primary">Login</md-button>
      </md-card-actions>
    </md-card>
  </section>
</template>
<script>
import * as user from "@/state/modules/user";
export default {
  data: () => ({
    patient: {},
    name: null,
    error: false,
    errorMessage: null
  }),
  methods: {
    loginPatient() {
      let uri = "http://localhost:4000/" + "patient/login";
      this.axios
        .post(uri, this.patient)
        .then(response => {
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            user.setUserType(this.$store, response.data.user.type);
            this.$router.push({
              name: "game-list"
            });
          }
        })
        .catch(err => {
          this.error = true;
          if (err.response.data) this.errorMessage = err.response.data.message;
        });
    }
  }
};
</script>



























<!--  -->

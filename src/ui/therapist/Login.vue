
<template>
  <section>
    <md-card md-with-hover>
      <md-card-header class="header-flex-container">
        <section class="header-left">
          <div class="md-title">Therapist login</div>
        </section>
      </md-card-header>
      <md-card-content>
        <div class="container">
          <div class="form">
            <span class="md-invalid" v-if="error" style="color:red">{{ errorMessage }}</span>
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
          @click="loginTherapist"
          class="md-raised md-primary">Login</md-button>
      </md-card-actions>
    </md-card>
  </section>
</template>
<script>
import * as user from "@/state/modules/user";
export default {
  data: () => ({
    therapist: {},
    name: null,
    error: false,
    errorMessage: null
  }),
  methods: {
    loginTherapist() {
      let uri = "http://localhost:4000/" + "therapist/login";
      this.axios
        .post(uri, this.therapist)
        .then(response => {
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            user.setUserType(this.$store, response.data.user.type);
            this.$router.push("/therapist/view_patients");
          }
        })
        .catch(err => {
          if (err) {
            this.error = true;
            this.errorMessage = err.response.data.message;
          }
        });
    }
  }
};
</script>



























<!--  -->

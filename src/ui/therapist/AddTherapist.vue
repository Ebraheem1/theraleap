
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
              <span class="md-helper-text" v-if="emailMessage != null" style="color:red">
                {{ emailMessage }}
              </span>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input v-model="therapist.password" type="password"></md-input>
              <span class="md-helper-text" v-if="passwordMessage != null" style="color:red">
                {{ passwordMessage }}
              </span>
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
    errorMessage: null,
    emailMessage: null,
    passwordMessage: null
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
          this.emailMessage = null;
          this.passwordMessage = null;
        })
        .catch(err => {
          var out = false;
          var email = false;
          var password = false;
          if (err.response.data.errors) {
            var arr = err.response.data.errors;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].param == "email") {
                email = true;
                this.emailMessage = arr[i].msg;
              } else if (arr[i].param == "password") {
                password = true;
                this.passwordMessage = arr[i].msg;
              }
            }
          } else if (err.response.data.message) {
            out = true;
            this.error = true;
            this.errorMessage = err.response.data.message
              ? err.response.data.message
              : err;
          }
          this.error = out ? true : false;
          this.emailMessage = email ? this.emailMessage : null;
          this.passwordMessage = password ? this.passwordMessage : null;
        });
    }
  }
};
</script>



























<!--  -->

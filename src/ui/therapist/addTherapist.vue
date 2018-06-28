
<template>
  <div>
    <h1>Invite A Therapist</h1>
    <!-- .prevent here to prevent reloading the page after clicking on submit button -->
    <form v-on:submit.prevent="createTherapist">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="therapist.name">
          </div>
        </div>
      </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Email:</label>
              <input type="text" class="form-control col-md-6" v-model="therapist.email">
            </div>
          </div>
        </div>
        <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Password:</label>
            <input type="text" class="form-control" v-model="therapist.password">
          </div>
        </div>
      </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Create Therapist</button>
        </div>
    </form>
  </div>
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
      this.axios.post(uri, this.therapist).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

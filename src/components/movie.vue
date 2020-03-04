<template>
  <v-app>
    <v-container fluid>
      <v-row dense align="center" justify="center">
        <v-col colspan="5">
          <v-card class="inline-block ma-10 pa-10" elevation="4" max-height="500" max-width="450">
            <v-card-title class="headline">Movie Reviews</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-text-field label="Name" v-model="name" @click="name = mov_name" required></v-text-field>
                <v-text-field label="Review" v-model="review" :counter="150" required></v-text-field>
                <v-slider v-model="rating" label="Rating" min="1" max="5" thumb-label></v-slider>
                <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="Do you agree?"
                  required
                ></v-checkbox>
                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate()">Submit</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// const axios = require("axios");
export default {
  name: "movie",
  props: ['mov_name'],
  data() {
    return {
      feedbacks: [],
      name: this.mov_name,
      review: "",
      rating: 1,
      valid: true,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 150) || "Name must be less than 150 characters"
      ],
      select: null,
      checkbox: false,
      lazy: true
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        console.log("Entered validate.")
      }
      console.log("Feedback: ", this.name)
      // if (this.validateName(this.name)) {
      //   axios({
      //     method: "POST",
      //     url: "http://localhost:8000/postReview",
      //     data: {
      //       name: this.name,
      //       review: this.review,
      //       rating: this.rating
      //     }
      //   });
      // }
    },
  },
  watch: {
    name(val) {
      console.log('Watch: ', val)
    }
  }
};
</script>

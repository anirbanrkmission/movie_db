<template>
  <v-app>
    <v-container fluid>
      <v-row dense align="center" justify="center">
        <v-col colspan="5">
          <v-card class="inline-block ma-10 pa-10" elevation="4" max-height="500" max-width="450">
            <v-card-title class="headline">Movie Reviews</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-text-field label="Click to Review Movie" v-model="name" @click="changeMovNameId(mov_id)" required></v-text-field>
                <v-text-field label="Review" v-model="review" :counter="150" required></v-text-field>
                <v-slider v-model="rating" label="Rating" min="1" max="10" thumb-label ticks="always"></v-slider>
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
const axios = require("axios");
export default {
  name: "movie",
  props: ['mov_id'],
  data() {
    return {
      feedbacks: [],
      name: '',
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
      
      axios({
        method: "POST",
        url: 'https://api.themoviedb.org/3/movie/'+ this.mov_id +'/rating?api_key=8e0015628a213a97ac3775e77c598429',
        data: {
          value: this.rating
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).catch(
        (err) => {
          console.log(err.message)
        }
      );
    },
    changeMovNameId(id) {
      this.name = axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=8e0015628a213a97ac3775e77c598429&language=en-US')
      .then(
        response => {
          this.name = response.data.title
        });
        // this.validate()
    }
  },
  watch: {
    name(val) {
      console.log('Watch: ', val)
    }
  },
  mounted() {
    this.changeMovNameId(this.mov_id)
  }
};
</script>

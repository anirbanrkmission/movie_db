<template>
  <v-app>
    <v-container fluid>
      <v-text-field v-model="search" label="search" @input="searchMov"></v-text-field>
      <v-row no-gutters v-if="items">
        <v-col cols="6" v-for="(item, ix) in items.results" :key="ix">
          <v-card 
            class="pa-3"
            elevation="5"
            min-height="700"
            dark
            outlined
          >
            <v-card-title>
              <p style="color: green;">{{item.title}} | {{item.vote_average}}/10 | Reviewers: {{item.vote_count}}
              <br/>Released On: {{item.release_date}}</p>
              <v-spacer/>
              <v-chip
                color="green accent-4"
                v-for="(genre, g_ix) in item.genre_ids"
                :key="g_ix"
              >{{movie_genres[item.genre_ids.indexOf(genre)]}}</v-chip>
            </v-card-title>
            <v-card-text>
              <v-img height="300" width="350" :src="getImg(item.poster_path)"></v-img>{{item.overview}}
            </v-card-text>
            <v-card-actions>
              <v-btn icon :id="ix" @click="likeMovie(ix)"><v-icon>mdi-heart</v-icon></v-btn>
              <v-btn icon :id="ix" @click="reviewMovie(item)"><v-icon>mdi-pencil</v-icon></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        dark
        fixed
        bottom
        right
        color="green accent-4"
        @click="toTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-container>
  </v-app>
</template>

<script>
const axios = require("axios");
export default {
  name: 'info',
  data() {
    return {
      items: [],
      movie_genres: [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "History",
        "Horror",
        "Music",
        "Mystery",
        "Romance",
        "Science Fiction",
        "TV Movie",
        "Thriller",
        "War",
        "Western"
      ],
      genre_id: [
        28,
        12,
        16,
        35,
        80,
        99,
        18,
        10751,
        14,
        36,
        27,
        10402,
        9648,
        10749,
        878,
        10770,
        53,
        10752,
        37,
      ],
      search: '',
      fab: false,
    };
  },
  mounted () {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=8e0015628a213a97ac3775e77c598429"
        )
        .then(response => {
          this.items = response.data;
          console.log('Response: ', response.data)
          // console.log(this.items.page)
        });
    },
    getImg(poster) {
      return "https://image.tmdb.org/t/p/w185/"+poster;
    },
    likeMovie(ix) {
      // this.color_field = 'green';
      var col = document.getElementById(ix).style.color;
      if (col != 'green')
        document.getElementById(ix).style.color = 'green';
      else {
        document.getElementById(ix).style.color = 'white';
      }
    },
    reviewMovie(item) {
      /* eslint: off */
      console.log('Review: ', item.title)
      this.$store.commit('change', item.title)
      this.$emit('change', 'tab-2', item.id)
      console.log('ID: ', item.id)
      // this.$emit('update', item.title)
    },
    searchMov() {
      console.log(this.search)
      if (this.search == '') {
        this.getData()
      }
      axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=8e0015628a213a97ac3775e77c598429&language=en-US&page=1&include_adult=false&query="+this.search)
      .then( response => {
        this.items = response.data
      });
    },
    onScroll (e) {
      if (typeof window === 'undefined') return;
      const top = window.pageYOffset ||   e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
  }
};
</script>

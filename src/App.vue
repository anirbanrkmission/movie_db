<template>
  <v-app>
    <v-tabs v-model="tab" background-color="green accent-4" centered dark>
      <v-tab href="#tab-1">
        <v-icon>mdi-information-outline</v-icon>
      </v-tab>
      <v-tab href="#tab-2">
        <v-icon>mdi-movie</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1"><info/></v-tab-item>
      <v-tab-item value="tab-2"><movie/></v-tab-item>
    </v-tabs-items>
  </v-app>
</template>

<script>
import movie from './components/movie';
import info from './components/info';
export default {
  name: 'App',
  components: {
    movie,
    info
  },
  data: () => ({
    tab: null,
    //
  }),
};
</script>

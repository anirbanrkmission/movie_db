<template>
  <v-app>
    <v-tabs v-model="tab" background-color="green accent-4" fixed-tabs centered dark >
      <v-tab key="tab-1" href="#tab-1" >
        <v-icon>mdi-information-outline</v-icon>
      </v-tab>
      <v-tab key="tab-2" href="#tab-2">
        <v-icon>mdi-movie</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1"><info @change="changeTab"/></v-tab-item>
      <v-tab-item value="tab-2"><movie :mov_name="mov_name"/></v-tab-item>
    </v-tabs-items>
  </v-app>
</template>

<script>
import movie from './components/movie'
import info from './components/info'
export default {
  name: 'App',
  components: {
    movie,
    info
  },
  watch: {
    tab (val) {
      // this.changeTab(val)
      console.log(val);
    }
  },
  data: () => ({
    tab: 'tab-1',
    mov_name: '',
    //
  }),
  methods: {
    changeTab(event, name) {
      this.tab = event

      this.mov_name = name
    },
  }
};
</script>

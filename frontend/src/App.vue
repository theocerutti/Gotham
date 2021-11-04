<template>
  <v-app color="success">
    <side-bar/>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import SideBar from './components/SideBar.vue'

export default {
  name: 'App',

  components: {
    SideBar,
  },

data: () => ({
    //
  }),
};
</script>

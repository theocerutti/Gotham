<template>
  <v-app>
    <v-navigation-drawer />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import SideBar from './components/SideBar.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

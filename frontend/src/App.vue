<template>
  <v-app>
      <navigation/>
      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>
  </v-app>
</template>

<script>

import Navigation from './components/Navigation.vue'

export default {
  name: 'App',

  components: {
    Navigation,
  },

  mounted() {
    const darkTheme = localStorage.getItem("dark_theme");
    if (darkTheme) {
        if (darkTheme === "true") {
            this.$vuetify.theme.dark = true;
        } else {
            this.$vuetify.theme.dark = false;
        }
    } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        this.$vuetify.theme.dark = true;
        localStorage.setItem(
            "dark_theme",
            this.$vuetify.theme.dark.toString()
        );
    }
  },

  data: () => ({

    }),
  };
</script>

<template>
  <div>
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu" ></v-app-bar-nav-icon>
      <v-toolbar-title>Gotham</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon href="/my-account" class="mr-5">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-menu offset-y :close-on-content-click="false" :nudge-width="200" v-model="menu">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="mr-5" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-switch v-model="darkMode" @change="toggle_dark_mode" color="blue darken-3"></v-switch>
              </v-list-item-action>
              <v-list-item-title>Dark mode</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer app v-model="sidebarMenu">
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.path">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-spacer></v-spacer>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'SideBar',

    data() {
      return {
        items: [{
            icon: 'mdi-home',
            title: 'Dashboard',
            path: '/',
          },
          {
            icon: 'mdi-calendar',
            title: 'Arrival & Departure',
            path: '/departure',
            active: false,
          },
          {
            icon: 'mdi-account',
            title: 'My account',
            path: '/my-account',
            active: false
          },
          {
            icon: 'mdi-login',
            title: 'Login',
            path: '/login',
          },
          {
            icon: 'mdi-account-plus',
            title: 'Register',
            path: '/register',
          }
        ],

        darkMode: null,
        menu: false,
        sidebarMenu: true
      }
    },

    mounted() {
      this.darkMode = JSON.parse(localStorage.getItem("dark_theme"));
      console.log(' this.darkMode :',  this.darkMode )
      console.log('this.darkMode :', typeof(this.darkMode))
    },

    methods: {
      toggle_dark_mode: function() {
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
          localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
      }
    }

  }
</script>
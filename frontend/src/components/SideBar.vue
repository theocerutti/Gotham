<template>
  <v-navigation-drawer app dark color="secondary">
    <v-list>
      <v-subheader class="blackWhite--text">GOTHAM</v-subheader>
      <v-btn rounded @click="changeTheme" color="blue">Theme</v-btn>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.path" 
        >
          <v-list-item-icon>
            <v-icon color="blackWhite">{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" class="blackWhite--text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-spacer></v-spacer>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'SideBar',

    data () {
      return {
        items: [
          {
            icon: 'mdi-home',
            title: 'Dashboard',
            path: '/',
          },
          {
            icon: 'mdi-clock',
            title: 'Time Tracker',
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
        ]
      }
    },
    methods: {
      changeTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      }
    }
  }
</script>
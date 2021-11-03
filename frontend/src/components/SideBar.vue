<template>
  <v-navigation-drawer app dark class="lighten-3">
    <v-list>
      <v-subheader>GOTHAM</v-subheader>
      <v-list-item-group>
        <!-- <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item v-if="isLogged" to="/">
         <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="'Dashboard'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="isLogged" to="/departure">
         <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="'Arrival & Departure'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="isLogged" to="/my-account">
         <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="'My account'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="!isLogged" to="/login">
         <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="'Login'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="!isLogged" to="/register">
         <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="'Register'"></v-list-item-title>
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
        ]
      }
    },
    computed: {
      isLogged() {
        return this.$store.getters.isLogged;
      }
    }
  }
</script>
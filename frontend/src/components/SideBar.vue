<template>
  <v-navigation-drawer app dark class="lighten-3">
    <v-list>
      <v-subheader>GOTHAM</v-subheader>
      <v-list-item-group>
        <v-list-item
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
            active: true
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
          }
        ]
      }
    }
  }
</script>
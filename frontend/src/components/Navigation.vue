<template>
  <div>
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>Gotham</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y :close-on-content-click="false" :nudge-width="50" v-model="menu1">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="mr-5" v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card
          class="mx-auto"
          max-width="300"
          tile
        >
          <v-list dense>
            <v-list-item-group
              color="primary"
            >
              <v-list-item
                v-for="(itemNav, i) in itemsNav"
                :key="i"
                @click="itemNav.action"
              >
                <v-list-item-icon>
                  <v-icon v-text="itemNav.icon1"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="itemNav.text1"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
      <v-menu offset-y :close-on-content-click="false" :nudge-width="50" v-model="menu">
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
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.path" exact-path>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-divider color="grey"></v-divider>
      <template v-slot:append>
        <div class="pa-3">
          <v-btn block @click="accountLogout">
            <v-icon left>mdi-logout</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
console.log("LOCATION", location, location.pathname);
export default {
  name: "SideBar",
  data() {
    return {
      items: [
        {
          icon: "mdi-clock",
          title: "Time Tracker",
          path: "/time-tracker",
        },
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          path: "/",
        },
        {
          icon: "mdi-account",
          title: "My account",
          path: "/my-account",
        },
        {
          icon: "mdi-account-multiple",
          title: "Teams",
          path: "/teams",
        }
      ],
      darkMode: null,
      menu: false,
      menu1: false,
      sidebarMenu: true,
      itemsNav: [
        {text1: "Account", icon1: "mdi-account", action: this.redirectToAccount},
        {text1: "Logout", icon1: "mdi-logout", action: this.accountLogout},
      ],
    };
  },
  mounted() {
    this.darkMode = JSON.parse(localStorage.getItem("dark_theme"));
  },
  methods: {
    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    accountLogout() {
      this.$store.dispatch("logout");
    },
    redirectToAccount() {
      this.$router.push("/my-account");
    }
  },
  watch: {
    locationItemsActive: () => {
      this.items = this.items.map(item => {
        item.active = location.pathname === item.path;
        return item;
      });
    }
  }
};
</script>
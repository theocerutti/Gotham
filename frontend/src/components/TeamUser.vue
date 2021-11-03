<template>
  <v-card id="container">
    {{ infos.username }}
    {{ infos.email }}
    {{ infos.id }}
  </v-card>
</template>

<script>
export default {
  name: "TeamUser",
  props: ["infos"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
#container {
  background-color: rgb(102, 97, 97) !important;
  padding: 35px;
  margin-top: 15px;
}
</style>
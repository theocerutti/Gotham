<template>
  <div>
    <v-alert prominent type="warning" shaped>
      <div>You don't have any working times!</div>
      <div>Use the clock to create one!</div>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "NoWorkingTime",
  data: () => ({}),
};
</script>

<style scoped>
</style>
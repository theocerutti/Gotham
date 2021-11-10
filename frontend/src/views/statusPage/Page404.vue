<template>
  <div class="container">
    <div class="status-title">404 page</div>
    <div class="status-description">It seems you tried to go to an unknown page... You should come back home!!!</div>
    <v-btn @click="goToHome()">Home</v-btn>
  </div>
</template>

<script>
import {router} from "../../main";

export default {
  name: "Page404",
  components: {},
  methods: {
    goToHome() {
      router.push("/");
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.status-title {
  font-size: 60px;
}

.status-description {
  font-size: 1rem;
  font-style: italic;
  padding-bottom: 5px;
}
</style>

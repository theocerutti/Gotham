<template>
  <div>
    <notifications position="bottom right" width="400" classes="notif-container"/>
  </div>
</template>

<script>
import VueNotification from "vue-notification";

export default {
  name: "Notification",
  components: {
    VueNotification
  },
  props: {},
};
</script>

<style lang="scss">
.notif-container {
  // styling
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  color: #ffffff;

  // default (blue)
  background: #44A4FC;
  border-left: 5px solid #187FE7;

  // types (green, amber, red)
  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }
}
</style>
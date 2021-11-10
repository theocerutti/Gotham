<template>
  <div>
    <notifications
      position="bottom right"
      :width="this.$vuetify.breakpoint.smAndUp ? '400': '100%'"
      :style="marginStyle"
      classes="notif-container"
    />
  </div>
</template>

<script>
import VueNotification from "vue-notification";

export default {
  name: "Notification",
  components: {
    VueNotification
  },
  computed: {
    marginStyle() {
      const marginSmAndUp = {"margin-right": "20px", "margin-bottom": "20px"};
      const marginMobile = {"margin": 0, "margin-top": "5px"};
      return this.$vuetify.breakpoint.smAndUp ? marginSmAndUp : marginMobile;
    }
  },
  props: {},
};
</script>

<style lang="scss">
.notif-container {
  // styling
  margin-top: 10px;
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
<template>
  <div id="app">
    <!-- <div><home/></div> -->
    <router-view></router-view>
    <div v-show="showTab">
      <footers></footers>
    </div>
  </div>
</template>

<script>
import footers from "@/components/footer.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["showTab"])
  },
  components: {
    footers
  }
};
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
<template>
  <div id="setting">

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    if (this.$store.state.showTab) {
      this.$store.commit("change");
    }
  },
  methods: {

  }
};
</script>

<style lang="scss">
    #setting {
        
    }
</style>



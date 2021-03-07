<template>
  <v-container>
    <h3>{{userInfo.firstName + ' ' + userInfo.middleName + ' ' + userInfo.lastName}}</h3>
  </v-container>
</template>

<script>
export default {
  name: 'AppUserInfo',
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {},
  async created() {
    this.userInfo = await this.$store.dispatch('user/info');
  },
};
</script>

<style scoped>
</style>

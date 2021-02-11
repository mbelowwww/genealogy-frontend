<template>
  <div class="header">
    <div class="header__nav">
      <div v-for="(item, index) in links" :key="index">
        <router-link :to='item.link'>{{item.title}}</router-link>
      </div>
    </div>
    <button @click="onLoginClick" style="width: 100px">{{loginCation}}</button>
  </div>
</template>

<script>

export default {
  name: 'TheHeader',
  components: { },
  data() {
    return {
      isLogin: false,
      links: [
        { link: { name: 'Home' }, title: 'Домой' },
        { link: { name: 'About' }, title: 'О нас' },
        { link: { name: 'Cabinet' }, title: 'Личный кабинет' },
      ],
    };
  },
  computed: {
    loginCation() {
      if (this.isLogin) {
        return 'Выход';
      }
      return 'Вход';
    },
  },
  methods: {
    onLoginClick() {
      this.isLogin = !this.isLogin;
    },
  },
};
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    height: 70px;
    padding: 0 40px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 -20px 40px #444444;
    &__nav{
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
    }
    a {
      text-decoration: none;
      color: #2c3e50;
      margin: 0 20px;
      font-size: 20px;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>

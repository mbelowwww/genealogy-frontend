import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    user,
  },
});

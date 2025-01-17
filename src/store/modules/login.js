import request from '../defaultRequest';

export default {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    setToken(state, data) {
      localStorage.setItem('token', data);
      state.token = data;
    },
    removeToken(state) {
      localStorage.setItem('token', '');
      state.token = '';
    },
  },
  actions: {
    async auth(context, data) {
      await request().post('/api/login', data)
        .then((res) => {
          context.commit('setToken', `Bearer ${res.data.jwt}`);
          console.log(res);
        });
    },
  },
};

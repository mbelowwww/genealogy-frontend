import request from '../defaultRequest';

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    async registration(context, data) {
      console.log(data);
      await request().post('/api/registration', data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};

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
    async info(_, data) {
      // eslint-disable-next-line no-return-await
      return await request()
        .get('/api/user/info', data)
        .then((res) => res.data);
    },
  },
};

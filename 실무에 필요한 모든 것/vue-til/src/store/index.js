import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser } from '@/api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    token: '',
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = '';
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);

      // this.logMessage = `${data.user.username}님 환영합니다.`;
      commit('setToken', data.token);
      commit('setUsername', data.user.username);
      return data;
    },
  },
});

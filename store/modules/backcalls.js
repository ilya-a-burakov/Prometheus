const isProd = process.env.NODE_ENV === 'production';
const isLocal = process.env.SERVER === 'local';
// --------------------------------------------------
// AXIOS
// --------------------------------------------------
import axios from 'axios';

var clientUrl = 'https://api.kulbabka.info';
var localtUrl = 'http://localhost:8081';

if (isLocal) {
  clientUrl = 'http://localhost:8081'
}

const $axios = axios.create({baseURL: clientUrl}) 


export const backcalls = {
  namespaced: true,
  state: {
    all: [],
  },
  actions: {
    async fetchAll({ commit }) {
      return await $axios.get(`/backcalls`).then(
        backcalls => {
          commit('setAll', backcalls.data)
          return Promise.resolve(backcalls.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async create({ commit }, backcall) {
      console.log(backcall)
      return await $axios.post(`/backcalls`, backcall).then(
        backcall => {
          // commit('push', backcall.data)
          return Promise.resolve(backcall.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async update({ commit }, backcall) {
      return await $axios.post(`/backcalls/` + backcall.id, backcall).then(
        backcall => {
          commit('set', backcall.data)
          return Promise.resolve(backcall.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async delete({ commit }, id) {
      return await $axios.delete(`/backcalls/` + id).then(
        backcall => {
          commit('remove', id)
          return Promise.resolve(backcall.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    setAll(state, backcalls) {
      state.all = backcalls
    },

  setCodeError(state, error) {
    state.error.status = error.response.status;
    state.error.headers = error.response.headers;
    state.error.data = error.response.data;
    state.error.show = true;

    setTimeout(() => state.error.show = false, 3000);

  },


    set(state, payload) {
      const backcall = state.all.find(backcall => backcall._id === payload._id)
      backcall.status = payload.status
      // var updatedItem = state.all.find(item => item._id = backcall._id)
      
      // updatedItem = backcall


      // state.all.push(updatedItem);
      // state.all.splice(-1,1);


    },

    push(state, backcall) {
      state.all.push(backcall)
    },
    remove(state, backcall) {
      state.all.splice(state.all.findIndex(b => b._id == backcall), 1);
    },
  },
  getters: {
  }
}
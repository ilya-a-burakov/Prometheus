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


export const blog = {
  namespaced: true,
  state: {
    all: [],
    current: {}
  },
  actions: {
    async fetchAll({ commit }) {
      return await $axios.get(`/blog`).then(
        blog => {
          commit('blog', blog.data)
          return Promise.resolve(blog.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async create({ commit }, blog) {
      console.log(blog)
      return await $axios.post(`/blog`, blog).then(
        blog => {
          // commit('push', blog.data)
          return Promise.resolve(blog.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async update({ commit }, blog) {
      return await $axios.post(`/blog/` + blog.id, blog).then(
        blog => {
          commit('set', blog.data)
          return Promise.resolve(blog.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async delete({ commit }, id) {
      return await $axios.delete(`/blog/` + id).then(
        blog => {
          commit('remove', id)
          return Promise.resolve(blog.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    setAll(state, blog) {
      state.all = blog
    },
    set(state, payload) {
      const blog = state.all.find(blog => blog._id === payload._id)
      blog.status = payload.status
      // var updatedItem = state.all.find(item => item._id = blog._id)
      
      // updatedItem = blog


      // state.all.push(updatedItem);
      // state.all.splice(-1,1);
    },

    push(state, blog) {
      state.all.push(blog)
    },
    remove(state, blog) {
      state.all.splice(state.all.findIndex(b => b._id == blog), 1);
    },
  },
  getters: {
  }
}
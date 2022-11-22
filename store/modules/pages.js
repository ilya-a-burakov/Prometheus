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



export const pages = {
  namespaced: true,
  state: {
    all: [], 
    current: {
      name: '',
      groups: [],
      url: '',
      content: ''
    }
  },
  actions: {
    async fetchAll({ commit }) {
      return await $axios.get(`/pages`).then(
        pages => {
          commit('setAll', pages.data)
          return Promise.resolve(pages.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async fetch({ commit }, page) {
      return await $axios.get(`/pages/` + page).then(
        page => {
          commit('set', page.data)
          return Promise.resolve(page.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async create({ commit }, page) {
      return await $axios.post(`/pages`, page).then(
        page => {
          commit('push', page.data)
          return Promise.resolve(page.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async update({ commit }, page) {
      return await $axios.post(`/pages/` + page.url, page).then(
        page => {
          commit('set', page.data)
          return Promise.resolve(page.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async delete({ commit }, url) {
      return await $axios.delete(`/pages/` + url).then(
        page => {
          commit('remove', url)
          return Promise.resolve(page.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    setAll(state, pages) {
      state.all = pages
    },
    init(state) {
      state.current = {
        name: '',
        groups: [],
        url: '',
        content: ''
      }
    },
    set(state, page) {
      page.groups = page.groups.toString();
      state.current = page
    },

    push(state, page) {
      state.all.push(page)
    },
    remove(state, page) {
      state.all.splice(state.all.findIndex(p => p.url == page), 1);
    },
  },
  getters: {
  }
}
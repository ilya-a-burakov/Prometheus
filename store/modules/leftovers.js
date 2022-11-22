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

export const leftovers = {
  namespaced: true,
  state: {
    all: [], 
    current: {
      type: '',
      order: '',
      positions: []
    }
  },
  actions: {
    async fetchAll({ commit }) {
      return await $axios.get(`/leftovers`).then(
        response => {
          commit('setAll', response.data)
          return Promise.resolve(response.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async fetch({ commit }, id) {
      return await $axios.get(`/leftovers/` + id).then(
        leftover => {
          commit('set', leftover.data)
          return Promise.resolve(leftover.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async create({ commit }, {type, order, positions}) {
      return await $axios.post(`/leftovers`, {type, order, positions}).then(
        response => {
          commit('push', response.data)
          return Promise.resolve(response.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async update({ commit }, leftover) {
      return await $axios.post(`/leftovers/` + leftover._id, leftover).then(
        leftover => {
          commit('set', leftover.data)
          return Promise.resolve(leftover.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async delete({ commit }, id) {
      return await $axios.delete(`/leftovers/`+ id).then(
        response => {
          commit('remove', id)
          return Promise.resolve(response.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },
    addProductToLeftover ({ state, commit}, product) {
      const cartItem = state.current.positions.find(item => item.id === product.id)
      if (!cartItem) {
        commit('pushProductToLeftover', product)
      } else {
        commit('incrementProductQuantity', cartItem)
      }
    },


  },
  mutations: {
    setAll(state, leftovers) {
      state.all = leftovers
    },
    set(state, leftover) {
      state.current = leftover
    },
    reset(state) {
      state.current = {
        type: '',
        order: '',
        positions: []
      }
    },
    push(state, leftover) {
      state.all.push(leftover)
    },
    remove(state, leftover) {
      state.all.splice(state.all.findIndex(l => l.id == leftover), 1);
    },
    pushProductToLeftover (state, product) {
      state.current.positions.push(product)
    },
    incrementProductQuantity (state, { id }) {
      const cartItem = state.current.positions.find(item => item.id === id)
      cartItem.quantity
    },
    deleteItemFromLeftover (state, leftoverItem) {
      var index = state.current.positions.findIndex(c => c.id == leftoverItem.id);
      state.current.positions.splice(index, 1);
    },
  },
  getters: {
    
  }
}
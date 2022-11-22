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

import Cookies from 'js-cookie'
export const users = {
  namespaced: true,
  state: {
    all: [], 
    roles: [],
    current: {
      status: { 
        loggedIn: false 
      }, 
      phone: '',
      name: '',
      surname: '',
      birthday: '',
      city: '',
      adress: '',
      roles: '',
      orders: []
    }
  },
  actions: {
    login({ commit }, user) {
      return $axios
        .post('/api/auth/signin', {
          phone: user.phone,
          password: user.password
        })
        .then(
          response => {
            if (response.data.accessToken) {
              Cookies.set('user', JSON.stringify(response.data));
            }
            commit('loginSuccess', response.data)
            return response.data;
          },
          error => {
            commit('setCodeError', error, { root: true })
            console.log('Login falied')
          }
        );
    },

    logout({ commit }) {
      Cookies.remove('user');
      commit('logout');
    },

    register({ commit }, user) {
      return $axios.post('/api/auth/signup', {
        phone: user.phone,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          Cookies.set('user', JSON.stringify(response.data));
        }

        return response.data;
      });
    },
    fetchRoles({ commit }) {
      $axios.get(`/users/roles`).then(
        roles => {
          commit('setRoles', roles.data)
          return Promise.resolve(users.data);
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },
    fetchUsers({ commit }) {
      $axios.get(`/users`).then(
        users => {
          commit('setUsers', users.data)
          return Promise.resolve(users.data);
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },
    // Fetch order by ID
    async fetchUser({ commit }, phone) {
      return await $axios.get('/users/' + phone).then(
        user => {
          commit('setUser', user.data)
          return Promise.resolve(user.data);
        },
        error => {
           commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },  
    updateUser({ state, commit }, user) {
      return $axios.post('/users/' + user.phone, user).then(
        response => {
          console.log(response)
          // commit('setUser', response.data)
          return Promise.resolve(response.data);
        },
        error => {
          console.log(error)
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    // /////////////  
    // Global
    // /////////////
    loginSuccess(state, user) {
      state.current.status.loggedIn = true;
      state.current.phone = user.phone;
      state.current.accessToken = user.accessToken;
      state.current.id = user.id;
    },
    loginFailure(state) {
      state.current.status.loggedIn = false;
      state.current.phone = null;
      state.current.accessToken = null;
      state.current.id = null;
    },
    logout(state) {
      state.current = null;
      state.current.status.loggedIn = false;
    },
    registerSuccess(state, user) {
      state.current.status.loggedIn = true;
      var userJSON = JSON.parse(Cookies.get('user'));
      state.current.phone = userJSON.phone;
      state.current.accessToken = userJSON.accessToken;
      state.current.id = userJSON.id;

      console.log(state.current);
    },
    registerFailure(state) {
      state.status.current;loggedIn = false;
      state.current.phone = null;
      state.current.accessToken = null;
      state.current.id = null;
    },
    setRoles(state, roles) {
      state.roles = roles
    },
    setUsers(state, users) {
      state.all = users
    },
    setUser(state, user) {
      state.current.phone = user.phone;
      state.current.name = user.name;
      state.current.surname = user.surname;
      state.current.birthday = user.birthday;
      state.current.city = user.city;
      state.current.adress = user.adress;
      state.current.orders = user.orders;
    }
  },
  getters: {
  }
}
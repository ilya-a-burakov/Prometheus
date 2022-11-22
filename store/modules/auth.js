import AuthService from '../../services/auth.service';
import Cookies from 'js-cookie'

export const auth = {
  namespaced: true,
  state: { 
    status: { 
      loggedIn: false 
    }, 
    user: null
  },
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user)
          // this.$router.push({ name: 'Account'})
           console.log('Login scueed')

          return Promise.resolve(user);
        },
        error => {
          commit('setCodeError', error, { root: true })
          console.log('Login falied')
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = JSON.parse(Cookies.get('user'));
      console.log(state.user);
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};






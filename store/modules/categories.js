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

export const categories = {
  namespaced: true,
  state: {
    all: [],
    current: {
      order: '1',
      name: '',
      url: '',
      subcategories: [],
      filters: []
    }
  },
  actions: {
    // Fetch all categories
    fetchCategories({ commit }) {
      $axios.get(`/categories`).then(
        categories => {
          commit('setCategories', categories.data)
          return Promise.resolve(categories.data);
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },
    updateCategories({ commit }, categories) {
      $axios.post(`/categories`, categories).then(
        categoriesUpdated => {
          commit('setCategories', categories)
          return Promise.resolve(categories);
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },
    // Fetch category by URL 
    fetchCategory({ commit }, url) {
      return $axios.get('/categories/' + url).then(
        category => {
          commit('setCategory', category.data)
          return Promise.resolve(category.data);

        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    }, 
    // Add new category
    addCategory({ state, commit }) {
      console.log(state.current)
      return $axios.post('/categories/add', state.current).then(
        category => {
          commit('addCategory', category.data)
          return Promise.resolve(category.data);
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },
    // Update existing categoryZzzz
    updateCategory({ state, commit }, url) {
      return $axios.post('/categories/' + url, state.current).then(
        category => {
          commit('updateCategory', category.data)
          return Promise.resolve(category.data);
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },
    deleteCategory({ state, commit }, url) {
      return $axios.delete('/categories/' + url)
      .then(function (response) {
          console.log(response);
          commit('deleteCategory', url)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  },
  mutations: {
    setCategories(state, categories) {
      state.all = categories
    },
    setCategory(state, category) {
      state.current = category
    },
    updateCategory(state, category) {
      state.current = category
      console.log(category)
      window.location.href = '/admin/categories/' + category.url + '/edit';
    },
    cleanCategoryState(state) {
      state.current = {
        order: '1',
        name: '',
        url: '',
        subcategories: [],
        filters: []
      }
    },
    addCategory(state, category) {
      state.all.push(category);
      window.location.href = '/admin/categories/' + category.url + '/edit';
    },
    deleteCategory(state, category) {
      var index = state.all.findIndex(c => c.url == category.url);
      state.all.splice(index, 1);
    },
  }
};

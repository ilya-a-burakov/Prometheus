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


export const products = {
  namespaced: true,
  state: {
    all: [],
    popular: [],
    pagination: {
      page: 1,
      perPage: 18,
    },
    filter: {
      modifications: [],
      price: {
        min: '',
        max: ''
      },
      extra: []
    },
    selectedColors:[],
    sort: {
      current: 'popularity',
      ascending: false
    },
    filtered: [],
    filteredPrice: [],
    search: {
      active: false,
      current: '',
      result:[]
    },
    current: {
      category: [],
      status: 'unpublished',
      infromation: [],
      coverImage: '',
      images: [],
      files: [],
      name: '',
      sale: 0,
      price: 0,
      selectedSize: '',
      selectedColor: false,
      modifications: [],
      description: ''
    }
  },
  actions: {
    // Product Page
    // Filter products
    setInitSize({ commit }, size ) { 
      commit('setSelectedSize', size);
    }, 
    // Filter products
    resetFilter({ commit }) { 
      commit('setResetFilter'); commit('setSort') 
    }, 
    resetSearch({ commit }) { 
      commit('setResetSearch');
    }, 
    toggleFilter({ commit }, filter)  { 
      commit('toggleSetFilter', filter) }, 

    toggleDynamicFilter({ commit }, filter)  { 
      commit('setDynamicFilter', filter) 
    }, 

    filterProducts ({ commit }, filter)  { 
      commit('setFilteredProducts', filter); 
      commit('setDynamicFilteredProducts', filter); 
      commit('setFilteredPriceProducts', filter); 
      commit('setSort') 
    },
    filterProductsPrice ({ commit }, filter)  { 
      commit('setFilteredPriceProducts'); 
      commit('setSort') 
    },

    // Sort products
    toggleSort      ({ commit }, sort)    { commit('toggleSetSort', sort) },
    sortProducts    ({ commit })          { commit('setSort') },
    // Sort products

    // Fetch all products
    async fetchProducts({ commit }) {
      return await $axios.get(`/products`).then(
        products => {
          commit('setProducts', products.data)
          commit('setSort')
          return Promise.resolve(products.data);
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },
    async fetchProductsPopular({ commit }) {
      return await $axios.get(`/products/popular`).then(
        products => {
          commit('setProductsPopular', products.data)
          return Promise.resolve(products.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },
     async fetchProductsPublished({ commit }) {
      return await $axios.get(`/products`).then(
        products => {
          commit('setProductsPublished', products.data)
          commit('setSort')
          return Promise.resolve(products.data);
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },
    // Fetch product by ID
    fetchProduct({ commit }, id) {
      return $axios.get('/products/' + id).then(
        product => {
          console.log(product)
          commit('setProduct', product.data)
          return Promise.resolve(product.data);
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },  
    async fetchProductPopular({ commit }) {
      return await $axios.get(`/products`).then(
        products => {
          commit('setProducts', products.data.slice(1, 5))
          return Promise.resolve(products.data.slice(1, 5));
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },  

    updateModifications({ state, commit }, id) {
      return $axios.post('/products/' + id + '/modifications', state.current.modifications).then(
        product => {
          // commit('updateCategory', category.data)
          return Promise.resolve(category.data);
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },
    updateProductInfo({ state, commit }, id) {
      if (id) {
        var axiosRef = $axios({
            method: 'post',
            url: '/products/' + id + '/info',
            data: state.current,
        });
      } else {
        var axiosRef = $axios({
            method: 'post',
            url: '/products/add',
            data: state.current,
        });
      }
      return axiosRef.then(
        product => {
          console.log(product.sale)
          // commit('addProduct', product.data)
          return Promise.resolve(product.data);
        },
        error => {
          // commit('setError', error)
          console.log(Error);
          return Promise.reject(error);
        }
      );
    },
   async  updateImages({ state, commit }, id) {
      const form = new FormData();
      form.append('imagesCategory', state.current.imagesCategory );
      form.append('images', JSON.stringify(state.current.images) );

      console.log(state.current.images)

      if (state.current.files) {
        for (let i = 0; i < state.current.files.length; i++) {
          console.log(state.current.files.length)
          form.append(state.current.files[i].name, state.current.files[i])
          console.log(state.current.files[i].name)
        }
      }

      var axiosRef = $axios({
        method: 'post',
        url: '/products/' + id + '/images',
        data: form,
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      return await axiosRef.then(
        product => {
          console.log(product)
          return Promise.resolve(product.data);
        },
        error => {
          console.log(Error);
          return Promise.reject(error);
        }
      );

    },
    deleteProduct({ state, commit }, product) {
      const fullURL = '/products/' + product.id
      console.log(fullURL)  
      return $axios.delete(fullURL)
      .then(
        response => {
          commit('deleteProduct', product)
          return Promise.resolve(response.data);
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },
    clearProduct({ state, commit }) {
      commit('clearProductState')
    }
  },
  mutations: {
    // /////////////  
    // Global
    // /////////////
    clearProductState (state, size) {
      // console.log(size)
      state.current = {
        category: [],
        status: 'unpublished',
        infromation: [],
        coverImage: '',
        images: [],
        files: [],
        name: '',
        price: 0,
        selectedSize: '',
        selectedColor: false,
        modifications: [],
        description: ''
      };
    },

    // /////////////  
    // Product page
    // /////////////
    setFilterColors (state, colors) {
      // console.log(size)
      state.selectedColors = colors;
    },
    setSelectedSize (state, size) {
      // console.log(size)
      state.current.selectedSize = size;
    },
    setSelectedColor (state, color) {
      console.log(color);
      state.current.selectedColor = color;
    },
    

    // /////////////
    // Sort
    // /////////////
    toggleSetSort(state, sort) {
      state.sort.current = sort; 
      state.sort.ascending = !state.sort.ascending;
      return state.filteredPrice.sort(function (l, r) {
          return l[sort] > r[sort] ? (state.sort.ascending ? 1 : -1) : l[sort] < r[sort] ? (state.sort.ascending ? -1 : 1) : 0;
      });
    },
    setSort(state) {
      return state.filteredPrice.sort(function (l, r) {
          return l[state.sort.current] > r[state.sort.current] ? (state.sort.ascending ? 1 : -1) : l[state.sort.current] < r[state.sort.current] ? (state.sort.ascending ? -1 : 1) : 0;
      });
    },
    // /////////////
    // Set products
    // /////////////
    setProductsPublished(state, products) {


      let publishedProduct = products.filter(function(product, index) {
        let result = product.modifications.every((m) => {
          return m.quantity > 0 
        })
         // && (product.quantity > 0 || result === true)

         // console.log(result !== false)
        return result !== 'false' && product.status !== 'unpublished'
      }) 
      state.all = publishedProduct
     
      state.filtered = publishedProduct.slice()
      state.filteredPrice = state.filtered
    },
    setProductsPopular(state, products) {
      state.popular = products
    },
    setProducts(state, products) {
      state.all = products
     
      state.filtered = products.slice()
      state.filteredPrice = state.filtered
    },
    setProduct(state, product) {
      state.current = product
      // state.current.coverImage2 = product.images[0];
    },
    addProduct(state, product) {
      state.all.push(product);
      window.location.href = '/admin/products/' + product.id + '/edit';
    },
    deleteProduct(state, product) {
      console.log('PRODUCT ID' + product.id)
      var index = state.all.findIndex(p => p.id == product.id);
      state.all.splice(index, 1);
    },
    loadMorePage(state) {
      state.pagination.page = state.pagination.page + 1;
      console.log(state);
    },
    resetPageNumber(state) {
      state.pagination.page = 1;
    },
    // /////////////
    // Filter
    // /////////////
    setResetFilter(state, product) {
      state.filter = {
        modifications: [],
        price: {
          min: '',
          max: ''
        },
        extra: []
      }
      state.filteredPrice = state.all.slice()
    },
    setFilterPrice(state, price) {
      state.filter.price = price
    },
    toggleSetFilter(state, filter) {
      var index = state.filter.modifications.indexOf(filter);

      if (index === -1) {
          state.filter.modifications.push(filter);
      } else {
          state.filter.modifications.splice(index, 1);
      }
    },
    setDynamicFilter(state, filter) {
      var index = state.filter.extra.indexOf(filter);

      if (index === -1) {
          state.filter.extra.push(filter);
      } else {
          state.filter.extra.splice(index, 1);
      }
    },
    setFilteredProducts(state, filter) {
      if(state.filter.modifications.length > 0) { 
        state.filtered = state.all.filter(function(product, index) {
          return product.modifications.some(function(modification, index) { 
            return modification.characteristics.some(function(char, index, array) { 
              if ((state.filter.modifications.indexOf(char.value) >= 0) || state.filter.modifications.some(function(v) { return char.value.indexOf(v) >= 0; })) {
                return true
              }
            })
          })
        })
      } else {
        state.filtered = state.all
      }
    },
    setDynamicFilteredProducts(state, filter) {
      if(state.filter.extra.length > 0) { 
        state.filtered = state.all.filter(function(product, index) {
          return product.infromation.some(function(info, index) { 
            if (state.filter.extra.includes(info.value)) {
              console.log('Product containe filter!');
                return true
            }
            })
        })
        console.log(state.filtered);
      } else {
        state.filteredPrice = state.all
      }
    },
    setFilteredPriceProducts(state) {
        if (Number.isNaN(state.filter.price.min)) {
          state.filter.price.min = ''
          console.log('Test 001')
        }
        if (Number.isNaN(state.filter.price.max)) {
          state.filter.price.max = ''
          console.log('Test 002')
        }
        
        if (state.filter.price.min == '' && state.filter.price.max == '' ) {
          state.filteredPrice = state.filtered
          console.log('Test 003')
        }

        if (state.filter.price.min == '' ) {
          state.filteredPrice = state.filtered.filter(function(product, index) {
            if (product.price <= state.filter.price.max ) {
              return true
            }
          })

          console.log('Test 004')
        }

       if (state.filter.price.max == '' ) {
        
          state.filteredPrice = state.filtered.filter(function(product, index) {
            if (product.price >= state.filter.price.min ) {
              console.log('Test 005')
              return true
            }
          })
        }
        console.log('Test 006')
       if (state.filter.price.max !== '' && state.filter.price.min !== '') {
        
          state.filteredPrice = state.filtered.filter(function(product, index) {
            if (product.price <= state.filter.price.max && product.price >= state.filter.price.min) {
               console.log('Test 008')
              return true
            }
          })
        }
    },
  },
  getters: {
    getProductSizes: (state) => {
      const variants = state.current.modifications.map(function(option, index, array) {
       
          return option.characteristics.filter(function(char, index, array) { 
            if (char.name === 'Размер') {
              return true;  
            }
          }) 
      });
      const variantsFiltered = variants.flat().map(function(option, index, array) {
        return option.value
      })

      const variantsOptimized = variantsFiltered.filter((v, i, a) => a.indexOf(v) === i);

      return variantsOptimized;
    },
    getProductColor: (state) => {
      const variants = state.current.modifications.map(function(option, index, array) {
        return option.characteristics.filter(function(char, index, array) { 
          if (char.name === 'Цвет') {
            return true;  
          }
        })
      });
      const variantsFiltered = variants.flat().map(function(option, index, array) {
        return option.value
      })

      const variantsOptimized = variantsFiltered.filter((v, i, a) => a.indexOf(v) === i);

      return variantsOptimized;
    },
  }
};
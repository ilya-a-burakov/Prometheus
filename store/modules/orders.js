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


import authHeader from '../../services/auth-header';

function isSizeModExist (product) {
  
  const isExist = product.value.modifications.filter(modification=>modification.characteristics.some(characteristic=>characteristic.name === 'Размер'))
  
  if (isExist.length > 0) {

    return 'Выберите размер';

  } else {
    return false;
  }
}


function isModExist (product, mod) {
  
  const isExist = product.value.modifications.filter(modification=>modification.characteristics.some(characteristic=>characteristic.name === mod))
  
  if (isExist.length > 0) {

    return 'Выберите цвет';

  } else {
    return false;
  }
}

export const orders = {
  namespaced: true,
  state: {
    all: [], 
    current: {
      status: '',
      payment: {
        type: ''
      },
      id: '',
      _id: '',
      name: '',
      surname: '',
      phone: '',
      email: '',
      city: '',
      delivery: '',
      adress: '',
      status: false,
      comment: '',
      items: [],
    }
  },
  actions: {
    updateOrderItems({ state, commit }, id) {
      console.log(state.current.items);
      
      return $axios.post('/orders/' + id, state.current.items).then(
        order => {
          commit('updateOrder', order.data)
          return Promise.resolve(order.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          console.log(error);
          return Promise.reject(error);
        }
      );
    },
    async fetchOrders({ commit }) {
      // return await $axios.get(`/orders`, { headers: authHeader() }).then(
      return await $axios.get(`/orders`).then(
        orders => {
          commit('setOrders', orders.data)
          return Promise.resolve(orders.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },
    // Fetch order by ID
    async fetchOrder({ commit }, id) {
      return await $axios.get('/orders/' + id).then(
        order => {
          commit('setOrder', order.data)
          return Promise.resolve(order.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },  
    addOrder({ state, commit, rootState }) {
      const reqdata = {
        'phone': state.current.phone,
        'order': state.current, 
        'items': rootState.shopcart.items
      }
      $axios.post('/orders/send', reqdata)
      .then(function (response) {
        console.log(response);
        commit('setOrderSucces', response.data)
      })
      .catch(function (error) {
        commit('setCodeError', error, { root: true })
        return Promise.reject(error);
      });
    },
    async changePaymentStatus({ commit }, id, status) {
      console.log(id)
      return await $axios.post('/orders/payment/' + id, status).then(
        order => {
          console.log('order.data')
          // commit('setOrder', order.data)
          return Promise.resolve(order.data);
        },
        error => {
          commit('setCodeError', error, { root: true });
          return Promise.reject(error);
        }
      );
    },  
    async confirmOrder({ commit }, {id, status, prop}) {
      return await $axios.post('/orders/confirm/' + id, {status, prop}).then(
        order => {
          console.log('order.data')
          // commit('setOrder', order.data)
          return Promise.resolve(order.data);
        },
        error => {
          commit('setCodeError', error, { root: true });
          return Promise.reject(error);
        }
      );
    },  
    addProductToOrder ({ state, commit}, product) {
      const cartItem = state.current.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit('pushProductToOrder', product)
      } else {
        commit('incrementItemQuantity', cartItem)
      }
    },
  },
  mutations: {
    pushProductToOrder (state,  product) {
      state.current.items.push({
        images: product.value.images, 
        id: product.value.id,
        price: product.value.price,
        name: product.value.name,
        size: isSizeModExist(product),
        color: isModExist(product, 'Цвет'),
        quantity: 1
      })
    },
    incrementItemQuantity (state, { id }) {
      const cartItem = state.current.items.find(item => item.id === id)
      cartItem.quantity++
    },
    deleteItemFromOrder (state, orderItem) {
      var index = state.current.items.findIndex(c => c.id == orderItem.id);
      state.current.items.splice(index, 1);
    },
    // /////////////  
    // Global
    // /////////////
    setOrders(state, orders) {
      state.all = orders
    },
    setOrder(state, order) {
      state.current = order
    },
    resetOrder(state) {
      state.current = {
        status: '',
        id: '',
        _id: '',
        name: '',
        surname: '',
        phone: '',
        email: '',
        deliverycity: '',
        delivery: '',
        adress: '',
        status: false,
        comment: ''
      }
    },
    updateOrder(state, order) {
      state.current = order
    },
    setOrderSucces(state, order) {
      state.current.status = true;
    },
    setOrderCloses(state, order) {
      state.current.status = false;
    },
    
    
  },
  getters: {
    getProductSizes: (state, getters) => (product) => {
      const variants = product.modifications.map(function(option, index, array) {
        return option.characteristics.filter(function(char, index, array) { 
          if (char.name === 'Размер') {
            return true;  
          }
        })
      })
      const variantsFiltered = variants.flat().map(function(option, index, array) {
        return option.value
      })

      const variantsOptimized = variantsFiltered.filter((v, i, a) => a.indexOf(v) === i);

      return variantsOptimized;
    },
    getProductColors: (state) => ({product, productData}) => {
      const variants = productData.modifications.map(function(option, index, array) {
        return option.characteristics
      });

      const variantsReduced = variants.filter(function(option, index, array) {
        if (option.filter(e => e.value === product.size).length > 0) {
          return option
        }
      })

      const variantsReduced2 = variantsReduced.map(function(option, index, array) {
        return option.filter(function(char, index, array) { 
          if (char.name === 'Цвет') {
            return true;  
          }
        })
      }).flat();

      if (product.size) {
        return variantsReduced2.map(function(option) {
          return option.value
        });
      }

      if (!product.size) {
        return variants.flat()
      }
    },

     // /////////////  
    // OrderItems
    // /////////////
    orderTotalPrice: (state, getters) => {
      if (state.current.items.length > 0) {
      return getters.orderProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
      } else {
        return 0;
      }
    },
    orderTotalAmount: (state, getters) => {
      if (state.current.items.length > 0) {
        return getters.orderProducts.reduce((total, product) => {
          return total + 1 * product.quantity
        }, 0)
      } else {
        return 0;
      }
    },
    orderProducts: (state, getters, rootState) => {
      if (state.current.items.length > 0) {
         var quant =  state.current.items.map(({ id, name, price, images, size, color, quantity }) => {
          return {
            name,
            images,
            color,
            size,
            price,
            id,
            quantity
          }
        })
         return quant;
      } else {
        return 0;  
      }
    }
  }
  }
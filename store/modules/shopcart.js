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


export const shopcart = {
  namespaced: true,
  state: {
    items: [],
    currentState: false
  },
  actions: {
     async setShopCart({ commit }) {
      return JSON.parse(localStorage.getItem('shopcart')).then(
        products => {
          commit('setShopCart')
          return Promise.resolve(products.data);
        },
        error => {
          commit('setError', error)
          return Promise.reject(error);
        }
      );
    },
    toggleShopCart ({ state, commit }) {
      commit('chageShopCart', null)
    },
    addProductToCart ({ state, commit }, product) {
      const cartItem = state.items.find(item => (item.id === product.id) && (item.size === product.selectedSize) && (typeof product.selectedColor === 'string' ? item.color === product.selectedColor : true))

      if (cartItem) {
        commit('incrementItemQuantity', cartItem)
        
      } else {
        function setImages () {
          if (!product.selectedColor) {
            return product.images[0]
          } else {
            const filtered = product.images.filter(function(imageCategory, index) {
              if (imageCategory.name === product.selectedColor) return true; 
              // console.log(imageCategory.name)
            })
            if (filtered < 1) {
              return product.images[0]
            }
            console.log(filtered);
            return filtered[0]
          } 
        } 

        commit('pushProductToCart',  { id: product.id, images: setImages(), name: product.name,price: product.price })
      }
    },
    removeProductFromCart ({ state, commit }, product) {
      const cartItem = state.items.find(item => (item.id === product.id) && (item.size === product.size) && (item.color === product.color))
       if (cartItem && (product.size == cartItem.size) && (product.color == cartItem.color)) {
        commit('removeProduct', cartItem)
      } else {
        console.log('nothing!')
      }
    },
    decreaseQuantity ({ state, commit }, product) {
      const cartItem = state.items.find(item => (item.id === product.id) && (item.size === product.size) && (item.color === product.color))
      if (cartItem && (product.size == cartItem.size) && (product.color == cartItem.color)) {
        commit('decrementItemQuantity', cartItem)
      } else {
        console.log('nothing!')
        
      }
    },
  },
  mutations: {
    pushProductToCart (state,  {id, images,name, price} ) {
      state.items.push({
        id,
        images,
        name,
        price,
        color: this.state.products.current.selectedColor,
        size: this.state.products.current.selectedSize,
        quantity: 1
      })
      localStorage.setItem('shopcart', JSON.stringify(state.items));
    },

    setShopCart (state) {
      var dataShopCart = JSON.parse(localStorage.getItem('shopcart'));
      if (dataShopCart) {
        state.items = JSON.parse(localStorage.getItem('shopcart'))
      }
    },
    setShopCartNull (state) {
      state.items = []
      localStorage.removeItem('shopcart')
    },
    chageShopCart (state) {
      state.currentState = state.currentState ? false : true;
    },
    incrementItemQuantity (state, { id, size, color }) {
      console.log(size)
      const cartItem = state.items.find(item => (item.id === id ) && (item.size === size) && (item.color === color) )
      cartItem.quantity++
      localStorage.setItem('shopcart', JSON.stringify(state.items));
    },
    removeProduct (state, { id, size, color }) {
      const cartItem = state.items.find(item => (item.id === id ) && (item.size === size) && (item.color === color) )
      const cartItemIndex = state.items.indexOf(cartItem) 
      state.items.splice(cartItemIndex, 1);
      localStorage.setItem('shopcart', JSON.stringify(state.items));
    },
    decrementItemQuantity (state, { id, size, color }) {
      const cartItem = state.items.find(item => (item.id === id ) && (item.size === size) && (item.color === color) )
      const cartItemIndex = state.items.indexOf(cartItem) 
      console.log(cartItemIndex);
      cartItem.quantity-- 

      if (cartItem.quantity < 1 ) {
        state.items.splice(cartItemIndex, 1);
      }

      localStorage.setItem('shopcart', JSON.stringify(state.items));
    },
  },
  getters: {
     // Shop Cart
    getStoreCart: (state) => {
      return state; 
    },
    cartTotalPrice: (state, getters) => {
      if (state.items.length > 0) {
      return getters.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
      } else {
        return 0
      }
    },
    cartTotalAmount: (state, getters) => {
      if (state.items.length > 0) {
      return getters.cartProducts.reduce((total, product) => {
        return total + 1 * product.quantity
      }, 0)
      } else {
        return 0
      }
    },
    getStoreCartState: (state) => {
      return state.currentState; 
    },
    cartProducts: (state, getters, rootState) => {
      if (state.items.length > 0) {
        console.log(state.items.length)
        var quant = state.items.map(({ id, size,images, name, price, color, quantity}) => {
          return {
            images,
            name,
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
};
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

export const favorites = {
  namespaced: true,
  state: {
    items: [],
    currentState: false
  },
  actions: {
    toggleFavorites ({ state, commit, rootState }) {
      commit('changeFavorites', null)
    },
    addProductToFavorites ({ state, commit, rootState }, product) {
      const cartItem = state.items.find(item => (item.id === product.id))
      console.log(product);

      if (cartItem) {
        commit('removeProduct', cartItem)
        
      } else {
        commit('pushProductToCart', { id: product.id, images: product.images, name: product.name,price: product.price })
      }

      if (rootState.users.current.status.loggedIn === true) {
        console.log('hello')
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
  },
  mutations: {
    setFavorites (state) {
      var Favs = JSON.parse(localStorage.getItem('favorites'))

      if (Favs) {
         state.items = JSON.parse(localStorage.getItem('favorites'))
      } else {
        state.items = []
      }
    },
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
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
    changeFavorites (state) {
      state.currentState = state.currentState ? false : true;
    },
    removeProduct (state, { id, size, color }) {
      const cartItem = state.items.find(item => (item.id === id ) && (item.size === size) && (item.color === color) )
      const cartItemIndex = state.items.indexOf(cartItem) 
      state.items.splice(cartItemIndex, 1);
     localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
  getters: {
     // Shop Cart
    getStoreCart: (state) => {
      return state; 
    },
    favoritesTotalAmount: (state, getters) => {
       if (state.items.length > 0) {
      return getters.cartProducts.reduce((total, product) => {
        return total + 1 * product.quantity
      }, 0)
    } else {
      return 0
    }
    },
    getFavoritesState: (state) => {
      return state.currentState; 
    },
    cartProducts: (state, getters, rootState) => {
      if (state.items.length > 0) {
        console.log(state.items.length)
        var quant = state.items.map(({ id, size,images, name,price, color, quantity }) => {
          return {
            images,
            name,
            color,
            size,
            price,
            id,
            quantity,
          }
        })

        return quant;
      } else {
        return 0;
      }
    }
  }
};
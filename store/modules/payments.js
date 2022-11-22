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

export const payments = {
  namespaced: true,
  state: {
    current: {
      Status: ''
    },
    data:{}
  },
  actions: {
    async fetchAll({ commit }) {
      return await $axios.get(`/payments`).then(
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
      return await $axios.get(`/payments/` + id).then(
        payment => {
          commit('set', payment.data)
          return Promise.resolve(payment.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async create({ commit }, {type, order, positions}) {
      return await $axios.post(`/payments`, {type, order, positions}).then(
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

    async update({ commit }, payment) {
      return await $axios.post(`/payments/` + payment._id, payment).then(
        payment => {
          commit('set', payment.data)
          return Promise.resolve(payment.data);
        },
        error => {
          commit('setCodeError', error, { root: true })
          return Promise.reject(error);
        }
      );
    },

    async delete({ commit }, id) {
      return await $axios.delete(`/payments/`+ id).then(
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


  newPayment({ state, commit }, payment) {
    console.log(payment);
    $axios
      .post('/payment/newpayment', payment)
      .then(
        response => {
          $axios.post('/payment/update/' + response.data.PaymentId, response.data)
          console.log(response.data.PaymentId);
          location.replace(response.data.PaymentURL);

          return response.data;
        },
        error => {
          commit('paymentFailure');
          console.log('Payment falied')
        }
      )
      .then(
        payment => {
          commit('paymentSuccess', payment)
          // this.$router.push({ name: 'Account'})
           console.log('Payment created')
        },
        error => {
          commit('paymentFailure');
          console.log('Payment falied')
        }
      );
  },

  getStatus({ state, commit }, payment) {
    function getStatus(payment) {
      return $axios
        .post('/payment/getstatus', {order:payment })
        .then(response => {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getStatus(payment).then(
      payment => {
        commit('paymentSuccess', payment)
        // this.$router.push({ name: 'Account'})
         // console.log('Payment scueed')

        return Promise.resolve(payment);
      },
      error => {
        // commit('paymentFailure');
        // console.log('Payment falied')
        return Promise.reject(error);
      }
    );
  },
  
  // testPayment(payment) {
  //   console.log(payment);
  //   return $axios
  //     .post('/payment/testpayment', payment)
  //     .then(response => {
  //       console.log(response.data.PaymentId);
  //       location.replace(response.data.PaymentURL);

  //       return response.data;
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }
  
  // getUserPayments(user) {
  //   return $axios
  //     .get('/payment/getall', user)
  //     .then(response => {
  //       return response.data;
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // },

    // testPayment({ state, commit }, payment) {
    //   return PaymentService.testPayment(payment).then(
    //     payment => {
    //       commit('testPaymentSucces', payment)
    //        console.log('Payment created')
    //     },
    //     error => {
    //       commit('paymentFailure');
    //       console.log('Payment falied')
    //     }
    //   );
    // },


    // getUserPayments({ state, commit }, user) {
    //   return PaymentService.getUserPayments(user).then(
    //     payments => {
    //       commit('paymentsSuccess', payments)
    //       // this.$router.push({ name: 'Account'})
    //        // console.log('Payment scueed')

    //       return Promise.resolve(payments);
    //     },
    //     error => {
    //       // commit('paymentFailure');
    //       // console.log('Payment falied')
    //       return Promise.reject(error);
    //     }
    //   );
    // },

    // ADD_CUSTOMER({ state, commit }, user) {
    //   $axios.post(`/payment/getcustomercards`, user).then(
    //     response => {
    //       commit('setSucces', response)
    //       return Promise.resolve(response);
    //     },
    //     error => {
    //       commit('setCodeError', error, { root: true })
    //       return Promise.reject(error);
    //     }
    //   );  
    // },
    // GET_CUSTOMER_CARDS({ state, commit }, user) {
    //   $axios.post(`/payment/getcustomercards`, user).then(
    //     response => {
    //       commit('setCards', response.data)
    //       return Promise.resolve(response.data);
    //     },
    //     error => {
    //       commit('setCodeError', error, { root: true })
    //       return Promise.reject(error);
    //     }
    //   );  
    // }
  },

  mutations: {
    setSucces(state, customer) {
      console.log(customer);
      // state.status.loggedIn = true;
      state.customer = customer;
    },
    setCards(state, cards) {
      console.log(cards);
      // state.status.loggedIn = true;
      state.cards = cards;
    },
    paymentSuccess(state, payment) {
      console.log(payment);
      // state.status.loggedIn = true;
      state.current = payment;
    },
    testPaymentSucces(state, payment) {
      console.log(payment);
      // state.status.loggedIn = true;
      state.validPay = payment;
    },
    paymentsSuccess(state, payments) {
      console.log(payment);
      state.all = payments;
    },
    paymentFailure(state) {
      // state.status.loggedIn = false;
      // state.user = null;
    },
    setAll(state, payments) {
      state.all = payments
    },
    set(state, payment) {
      state.current = payment
    },
    reset(state) {
      state.current = {
        type: '',
        order: '',
        positions: []
      }
    },
    push(state, payment) {
      state.all.push(payment)
    },
    remove(state, payment) {
      state.all.splice(state.all.findIndex(l => l.id == payment), 1);
    },
    pushProductToLeftover (state, product) {
      state.current.positions.push(product)
    },
    incrementProductQuantity (state, { id }) {
      const cartItem = state.current.positions.find(item => item.id === id)
      cartItem.quantity
    },
    deleteItemFromLeftover (state, paymentItem) {
      var index = state.current.positions.findIndex(c => c.id == paymentItem.id);
      state.current.positions.splice(index, 1);
    },
  },
  getters: {
    
  }
}
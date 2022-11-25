import { createSSRApp } from 'vue';
import { _createRouter } from './router';
import { _createStore } from './store';

import VueNextSelect from 'vue-next-select'

import App from './App.vue';
import { sync } from 'vuex-router-sync';

import Cookies from 'js-cookie'

// Global Components
import TestButton from './components/admin/elements/buttonTestState.vue';
import InputSelect  from '@/components/global/elements/InputSelect.vue'

// Is server
export function _createApp() {
  const app = createSSRApp(App),
    router = _createRouter(),
    store = _createStore();


  app.component('TestButton', TestButton)
  app.component('InputSelect', InputSelect)  
  app.component('vue-select', VueNextSelect)

  const clickOutside = {
    beforeMount: (el, binding) => {
      el.clickOutsideEvent = event => {
        // here I check that click was outside the el and his children
        if (!(el == event.target && el.contains(event.target))) {
          // and if it did, call method provided in attribute value
          binding.value();
        }
      };
      document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: el => {
      document.removeEventListener("click", el.clickOutsideEvent);
    },
  };
  
  app.directive("click-outside", clickOutside)
  
  app.mixin({
    methods: {
      // FOR SIGN IN AND SIGN UP 
      toggleSignInPopup() {
        store.commit('toggleSignInPopup')
        store.dispatch('resetSignIn')
        store.state.signin.signup = false;
      },
      changeToSignUp() {
        store.dispatch("changeToSignUp");
        store.dispatch('resetSignIn')
      },
      DateToFormattedString(d) {         
        var fixedDate = new Date(d);   
        var yyyy = fixedDate.getFullYear().toString();                                                  
        var mm = (fixedDate.getMonth()+1).toString(); // getMonth() is zero-based         
        var dd  = fixedDate.getDate().toString();    
        var hh  = fixedDate.getHours().toString();    
        var minmin  = fixedDate.getMinutes().toString();             
                             
        return yyyy + '.' + (mm[1]?mm:"0"+mm[0]) + '.' + (dd[1]?dd:"0"+dd[0]) + " в " + (hh[1]?hh:"0"+hh[0]) + ':' + (minmin[1]?minmin:"0"+minmin[0]);
      }, 
      // INPUT GLOBALS
      updateInputText (object, property, event) {
        if (event.target) {
          var element = (event.target.files) ? event.target.files : event.target.value
        } else {
          var element = event
        }
        store.commit('updateInputText', {object, property, element})
      },
      setInputText (object, property, event) {
        store.commit('updateInputText', {object, property, event})
      },
      updateInputTel (object, property, event) {
        var element = event.target.value
        store.commit('updateInputTel', {object, property, element})
      },
      deleteArrayObject (object, property) {
        store.commit('deleteArrayObject', {object, property})
      },
      addArrayObject (object, property) {
        store.commit('addArrayObject', {object, property})
      }
    }
  })

  router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const { authorize } = to.meta;
    const isLogin = store.state.users.current.status.loggedIn
    const currentUser = store.state.users.current

    if (authorize) {
        if (isLogin === false) {
            // not logged in so redirect to login page with the return url
            return next({ path: '/', query: { returnUrl: to.path } });
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.some(r=> currentUser.roles.includes(r))) {
            // role not authorised so redirect to home page
            return next({ path: '/' });
        }
    }

    next();
  })

  sync(store, router);

  app
    .use(router)
    .use(store)

  return { app, router, store };
}

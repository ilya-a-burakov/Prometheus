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

// --------------------------------------------------
// MODULES
// --------------------------------------------------
import { auth } 			from "./modules/auth";
import { categories } from "./modules/categories";
import { products } 	from "./modules/products";
import { shopcart } 	from "./modules/shopcart";
import { favorites } 	from "./modules/favorites";
import { backcalls } 	from "./modules/backcalls";
import { orders } 		from "./modules/orders";
import { leftovers } 	from "./modules/leftovers";
import { pages } 			from "./modules/pages";
import { users } 			from "./modules/users";
import { payments } 	from "./modules/payments";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import { setNestedObject } from "./helpers/setNestedObject";
import { deleteNestedObject } from "./helpers/deleteNestedObject";
import { addNestedObject } from "./helpers/addNestedObject";
// --------------------------------------------------
// STORE INIT
// --------------------------------------------------
import { createStore } from 'vuex'

const state = () => {
	const s = {
		error: {
			status: '',
			headers: '',
			data: '',
			show: false
		},
		shopadress: {
			status: false
		},
		backcall: {
			status: false,
			phone: ''	
		},
		// Sign In and Sign Up Flow
		signin: {
			isOpen: false,
			signup: false
		},
		signup: {
			code: {
				isSended: false,
				value: '',
				isValid: false 
			} 
		},
		// User
		user: {
			phone: '',
			password: '',
			repeatpassword: '',
			code: ''
		},
		checkoutStatus: null
	}
	return s
}

const actions = {
	// Sign In and Sign Up Flow
	openSignInPopup ({ state, commit }) {
		commit('toggleSignInPopup', null)
	},	
	changeToSignUp ({ state, commit }) {
		commit('toggleToSignUp', null)
	},	
	sendCode({ state, commit }) {
		return	$axios.post('/api/auth/sendcode', state.user)
		.then(function (response, err) {
			if (err) {
        commit('setCodeError', response.data)
        console.log('error');
      }
	    console.log(response.data);
	    commit('setCode', response.data)
		})
		.catch(function (error) {
			if (error.response) {
	      console.log(error.response.data);
	      console.log(error.response.status);
	      console.log(error.response.headers);
	    }
			commit('setCodeError', error)
		});
	},
	validCode({ state, commit }) {
	   commit('setValidCode')
	},
	resetSignIn ({ state, commit }) {
		commit('resetAllSignIn', null)
	},
	
}

const mutations = {
	toggleShopAdress(state) {
    state.shopadress.status =  !state.shopadress.status;
  },
	toggleBackCall(state) {
    state.backcall.status =  !state.backcall.status;
    state.backcall.phone =  '';
  },
	// Global
	updateInputText (state, {object, property, element}) {
		console.log(element)

		setNestedObject(state[object], property, element);
	},

	updateInputTel (state, {object, property, element}) {

		const phoneNumber = element.replace(/(\+7)*[^\d]/g, "");
		const phoneNumberLength = phoneNumber.length;
		var phoneResult = `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6 )}-${phoneNumber.slice(6, 10)}`;
		if (phoneNumberLength < 7) {
			phoneResult =`+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
		}
		if (phoneNumberLength < 4) { 
			phoneResult = '+7 ' + phoneNumber; 
		}
		console.log(element)

		setNestedObject(state[object], property, phoneResult);
	},
	deleteArrayObject(state, {object, property}) {
		deleteNestedObject(state[object], property);
		// console.log(editedArray)
  },
  addArrayObject(state, {object, property}) {
		addNestedObject(state[object], property);
  },
  // Reset state
  emptyState(state) {
    state.nodes = []
  },
	// Sign in and Sign up Flow
	toggleSignInPopup (state) {
		state.signin.isOpen = state.signin.isOpen ? false : true;
	},
	toggleToSignUp (state) {
		state.signin.signup = state.signin.signup ? false : true;
	},
	SET_TOKEN (state, value) {
		if (value === null) {
			state.auth.status.loggedIn = false
		} else {
			state.auth.status.loggedIn = true
		}
    state.auth.user = value
  },	 
	resetAllSignIn (state) {
		state.user = {
			phone: '',
			code: '',
			password: '',
			repeatpassword: ''
		}
		state.signup.code = {
			isSended: false,
			value: '',
			isValid: false 	
		};
	},
	setCode (state, code) {
		state.signup.code.isSended = true;
		state.signup.code.value = code;
	},
	setCodeError(state, error) {
		state.error.status = error.response.status;
		state.error.headers = error.response.headers;
		state.error.data = error.response.data;
		state.error.show = true;

		setTimeout(() => state.error.show = false, 3000);

	},
	setValidCode (state) {
		state.signup.code.isValid = true;
	},

	updateInputText2 (state, {object, element}) {
		state[object] = element
	},

	updateInputTextArray (state, {type, element, purpose}) {
		let statePurpos = state[purpose]
		let splits = element.split(',')
		statePurpos[type] = splits
	},

	updateInputFile (state, {type, element, purpose}) {
		let statePurpos = state[purpose]
		statePurpos[type] = element
	},
}

const getters = {
	isUserLogin: (state) => {
   	return state.auth.status.loggedIn
	},
	// token
	token (state) {
    return state.token
  },
  // All sizes
  getAllSizes: (state) => {
  	console.log([...new Set(state.product.map((p) => p.variants))]) 
	},
	// Product
	getProductState: (state) => {
		return state.product; 
	},
	getProductsSizes: (state) => {

		const sizes = state.products.all.map(function(product, index, array) {
			return product.modifications.map(function(modification, index, array) { 
				if (modification.quantity > 0) {
					return modification.characteristics.map(function(characteristic, index, array) { 
							if ( characteristic.name === 'Размер') {
								return characteristic.value;
							}
					})
				}
			})
		});

		const sizes2 = sizes.flat().flat();

		const sizes3 = sizes2.filter((v, i, a) => a.indexOf(v) === i);

		return sizes3.filter(function (el) {
		  return el != null;
		});
	},
	getProductsColors: (state) => {
		const colors = state.products.all.map(function(product, index, array) {
			return product.modifications.map(function(modification, index, array) { 
				if (modification.quantity >= 0) {
					return modification.characteristics.map(function(characteristic, index, array) { 
							if ( characteristic.name === 'Цвет') {
								return characteristic.value;
							}
					})
				}
			})
		}).slice();

		const colors2 = colors.flat().flat();

		const colors3 = colors2.filter((v, i, a) => a.indexOf(v) === i)

		return colors3.filter(function (el) {
		  return el != null;
		});
	},
	getProductSizes: (state) => {
		// const variantsQuantity = state.products.current.modifications.filter((v, i, a) => v.quantity > 0);

		const variants = state.products.current.modifications.map(function(option, index, array) {
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
		// const variantsQuantity = state.products.current.modifications.filter((v, i, a) => v.quantity > 0);
			
		const variants = state.products.current.modifications.map(function(option, index, array) {
			return option.characteristics
		});

		const variantsReduced = variants.filter(function(option, index, array) {
			if (option.filter(e => e.value === state.products.current.selectedSize).length > 0) {
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

		if (state.products.current.selectedSize) {
			return variantsReduced2;
		}

		if (!state.products.current.selectedSize) {
			return variants.flat()
		}
	},
	getProductSizes2: (state) => {

		const variants = state.products.current.modifications.map(function(option, index, array) {
			
			var objes = {
				quantity: option.quantity,
				characteristics: option.characteristics 

			}

			return objes
		});

		variants.map(function(option, index, array) {
			option.characteristics = option.characteristics.filter(function(char, index, array) { 
				if (char.name === 'Размер') {
					return true;	
				}
			}).pop()
		})


		const variantsClenader = variants.filter(function(char, index, array) { 
			if (char.characteristics) {
				return true
			} 
		})

		const variantsFinished = variantsClenader.sort(function(a, b) {
		  return b.quantity - a.quantity;
		});

		if (variantsClenader.length > 0) {
			return Array.from(variantsClenader.reduce
				((m, {characteristics, quantity}) => m.set(characteristics.value, (m.get(characteristics.value) || 0) + quantity), new Map),
  			([name, quantity]) => ({name, quantity})
			);
		} else {
			var res123 = []
			return res123
		}
	},
	
	getProductColor2: (state) => { 
			const variants = state.products.current.modifications.map(function(option, index, array) {
			
				var objes = {
					quantity: option.quantity,
					characteristics: option.characteristics 
				}

				return objes
			})

			let variantsReduced = variants;

			if (state.products.current.selectedSize) {
				variantsReduced = variants.filter(function(option, index, array) {
				if (option.characteristics.filter(e => e.value === state.products.current.selectedSize).length > 0) {
				  return option
				}
				})
			}

			variantsReduced.map(function(option, index, array) {
				option.characteristics = option.characteristics.filter(function(char, index, array) { 
					if (char.name === 'Цвет') {
						return true;	
					}
				}).pop()	
			})

			const variantFinalised = variantsReduced.filter(function(char, index, array) { 
					if (char.characteristics) {
						return true;	
					}
				})
			return variantFinalised; 
	},
	getProductPrice: (state) => {
		return state.product.price.value; 
	},
}

if (module.hot) {
	module.hot.accept([actions, mutations], () => {
		store.hotUpdate({
			actions,
			mutations,
		})
	})
}

export function _createStore() {
	return createStore({
		state,
		getters,
		mutations,
		actions,
		modules: {
	    auth,
	    categories,
	    products,
	    shopcart,
	    favorites,
	    backcalls,
	    orders,
	    leftovers,
	    pages,
	    users,
	    payments
	  },

	})
}

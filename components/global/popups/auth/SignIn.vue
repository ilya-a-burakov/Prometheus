<template>
	<section v-if="!signin.signup" class="t-center popup">
		<!-- Close Popup -->
		<button @click="toggleSignInPopup()" class="button-close-popup button"><img src="@/assets/icons/cross.svg"></button>
		<!-- Popup Header -->
		<h2 class="mn-semi">Log In</h2>
		<!-- Popup Form -->
		<div class="mn-semi">
			<p class="mn-big t-transp p-big">Enter your phone number and password entered during registration:</p> 

			<div class="mn-small input-tel input">
				<input  maxlength="17" type="tel" class="b-center input-text input"  :placeholder="'Enter phone'" @input="updateInputTel( 'user', 'phone', $event)" :value="user.phone">
				<!-- <div class="input-status"></div> -->
			</div>
			<div class="input-tel input">
				<input  maxlength="17" class="b-center input-text input"  :placeholder="'Enter password'" @input="updateInputText('user', 'password', $event)" type="password" :value="user.password">
				<!-- <div class="input-status"></div> -->
			</div>
		</div>
		<!-- Popup Send -->
		<button @click="onSubmit" :disabled="(errorPassword) && (!!errorPhone)" class="mn-big w-100 button">Log In</button> 
		<a @click="changeToSignUp"  class="underline b-center">Don't have an account yet? Sign up!</a> 
	</section>  
</template>

<script setup>
	// Import components
import InputPhone  from 'prometheus/components/global/elements/InputPhone.vue'
// Import libs
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
// Accessing router and store
const store = useStore()
const route = useRoute()
const router = useRouter()
// Accessing state
const user = computed(() => store.state.user)
const signin = computed(() => store.state.signin)
// Input Validation
const errorPhone = computed(() => {
	return store.state.user.phone.length < 17 ? "Заполните поле телефона" : ''
})
const errorPassword = computed(() => {
	return store.state.user.password.length > 4 ? "Заполните поле пароля" : ''
})
// Methods
function onSubmit() {
  store.dispatch('users/login', store.state.user).then(() => {
  	var path = 'Account';

  	if  (route.name !== 'Home') {
  		store.dispatch("openSignInPopup");
			store.dispatch('resetSignIn')
  	} else {
			router.push({ name: 'Account'}).then(() => {
				store.dispatch("openSignInPopup");
				store.dispatch('resetSignIn')
			})
		}
	})
} 
</script>

<style lang="scss">
</style>

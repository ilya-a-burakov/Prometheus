<template>
	<section class="t-center section popup">
		<!-- Close Popup -->
		<button @click="toggleSignInPopup()" class="button-close-popup button"><img src="@/assets/icons/cross.svg"></button>
		
		<h2 class="mn-semi">Almost all!</h2>
		<div class="mn-semi">
			<p class="mn-big t-transp p-big">We have verified your phone number. Enter your password and registration is complete.</p> 

			<div class="input-tel input">
				<input 
					:placeholder="'Enter password'"
					class="mn-small input-text input" 
					@input="updateInputText('user', 'password', $event)" 
				>
				<input 
					:placeholder="'Repeat password'"
					class="input-text input" 
					@input="updateInputText('user', 'repeatpassword', $event)" 
				>
			</div>

		</div>
		<button @click="onSubmit" :disabled="(errorPassword === true) || (errorRepeatPassword === true)" class="w-100 button">Sign Up</button>
	</section>  
</template>

<script setup>
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
	const routePath = computed(() => route.name)
	// Validating form
	const errorPassword = computed(() => {
		return store.state.user.password.length < 4 ? true : false
	})
	const errorRepeatPassword = computed(() => {
		return store.state.user.repeatpassword.length < 5 ? true : false
	})
	
	function onSubmit() {
		const pass =  store.state.user.password;
		const repeatpass =  store.state.user.repeatpassword

		if ( pass === repeatpass ) {
  		store.dispatch('auth/register', store.state.user).then(() => {
				router.push({ name: 'Account'}).then(() => {
						store.dispatch("openSignInPopup");
						store.dispatch('resetSignIn')
					})
			})
    } else {
    	store.commit('setCodeError', { response: {status: "Пароли не совпадают", data: { message: "Введенные вами пароли не совпадают. Исправьте ошибки и попробуйте еще раз."}}})
    }
	}
</script>

<style lang="scss">

</style>

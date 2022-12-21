<template>
	<section v-show="!signup.code.isSended" class="t-center section popup">
		<!-- Close Popup -->
		<button @click="Store.auth.toggleSignInPopup()" class="button-close-popup button"><img src="@/assets/icons/cross.svg"></button>
		<!-- Header -->
		<h2 class="mn-semi">Registration</h2>
		<div class="mn-semi">
			<p class="mn-big t-transp p-big">We will send a registration code to your phone number</p>

			<div class="input-tel input">
				<InputText :obj="'auth'" :prop="'state.user.phone'" 		:value="user.phone" 		placeholder="Phone number" class="mn-small"/>
			</div>
		</div>
		<button @click="Store.auth.sendCode(user)" class="mn-big w-100 button">Submit code</button>
		<a @click="Store.auth.toggleSignUp()" class="underline mn-center">Do you already have an account? Log in!</a>
	</section>

</template>

<script setup>
	// Import components
import InputText  from 'prometheus/components/global/elements/InputText.vue'
// Import libs
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Import state
import * as Store from '@/store';
// Accessing router and store
const route = useRoute()
// Accessing state
const signin = Store.auth.state.status.signin
const signup = Store.auth.state.status.signup
const user = computed(() => Store.auth.state.user)
const routePath = computed(() => route.name)
// Input validation
const error = computed(() => {
	// return store.state.user.phone.length < 4 ? "Заполните поле телефона" : ''
})
function onSubmit() {
  store.dispatch('sendCode')
}
</script>

<style lang="scss">

</style>

<template>
	<section v-if="!signin.signup" class="t-center popup">
		<!-- Close Popup -->
		<button @click="Store.auth.toggleSignInPopup()" class="button-close-popup button"><img src="@/assets/icons/cross.svg"></button>
		<!-- Popup Header -->
		<img class='mn-semi i-big' src="@/assets/images/cover.png">
		<h4 class="mn-small">«Aliis Inserviendo Consumor»</h4>
		<p class="mn-semi t-transp">Enter your credentials to login</p>
		<!-- Popup Form -->
		<div class="mn-semi">
			<InputText :obj="'auth'" :prop="'state.user.phone'" 		:value="user.phone" 		placeholder="Phone number" class="mn-small"/>
			<InputText :obj="'auth'" :prop="'state.user.password'" 	:value="user.password" 	placeholder="Password" />
		</div>
		<!-- Popup Send -->
		<ButtonSend :submit="onSubmit" :callback="redirectTo" class="mn-big">Send</ButtonSend>
		<a 			@click="Store.auth.toggleSignUp()"  					class="underline mn-center">Don't have an account yet? Sign up!</a> 
	</section>  
</template>

<script setup>
// Import components
import InputText  from 'prometheus/components/global/elements/InputText.vue'
import ButtonSend  from 'prometheus/components/global/elements/ButtonSend.vue'
// Import libs
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Import state
import * as Store from '@/store';
// Accessing router
// const store = useStore()
const route = useRoute()
const router = useRouter()
// Accessing state
const signin = Store.auth.state.status.signin
const signup = Store.auth.state.status.signin.signup
const user = computed(() => Store.auth.state.user)
const errorPhone = {}
const errorPassword = {}
// Methods
async function onSubmit() {
  await Store.auth.login(Store.auth.state.user)
}

function redirectTo () {
	router.push({ name: 'Dashboard'})
	Store.auth.toggleSignInPopup()
}
</script>

<style lang="scss">
</style>

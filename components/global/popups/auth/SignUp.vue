<template>
	<section v-show="!signup.code.isSended" class="t-center section popup">
		<!-- Close Popup -->
		<button @click="toggleSignInPopup()" class="button-close-popup button"><img src="@/assets/icons/cross.svg"></button>
		<!-- Header -->
		<h2 class="mn-semi">Registration</h2>
		<div class="mn-semi">
			<p class="mn-big t-transp p-big">We will send a registration code to your phone number</p>

			<div class="input-tel input">
				<input maxlength="17" type="tel" class="b-center input-text input" :placeholder="'Enter phone number'" @input="updateInputText( 'user', 'phone', $event) " :value="user.phone">
				<!-- <div class="input-status"></div> -->
			</div>
		</div>
		<button @click="onSubmit()" :disabled="!!error" class="mn-big w-100 button">Submit code</button>
		<a @click="changeToSignUp" class="underline b-center">Do you already have an account? Log in!</a>
	</section>

</template>

<script setup>
// Import components

// Import libs
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
// Accessing router and store
const store = useStore()
const route = useRoute()
// Accessing state
const user = computed(() => store.state.user)
const signup = computed(() => store.state.signup)
const routePath = computed(() => route.name)
// Input validation
const error = computed(() => {
	return store.state.user.phone.length < 4 ? "Заполните поле телефона" : ''
})
function onSubmit() {
  store.dispatch('sendCode')
}
</script>

<style lang="scss">

</style>

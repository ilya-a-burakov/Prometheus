<template>
	<section class="t-center section popup">
	<!-- Close Popup -->
		<button @click="Store.auth.toggleSignInPopup()" class="button-close-popup button"><img src="@/assets/icons/cross.svg"></button>

		<h2 class="mn-semi">Enter Code</h2>
		<div class="mn-semi">
			<p class="mn-big t-transp p-big">We have sent a registration code to your phone number. Enter it in the box below:</p>

			<div class="input-tel input">
				<InputText :obj="'auth'" :prop="'state.user.code'" 		:value="user.code" 		placeholder="Code" class="mn-small"/>
			</div>
			</div>
		<button @click="Store.auth.validCode()" :disabled="!!error" class="w-100 button">Verify</button>
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
	const route = useRoute()
	// Accessing state
	const user = computed(() => Store.auth.state.user)
	const signup = Store.auth.state.status.signup
	const routePath = computed(() => route.name)
	// Validation
	const error = computed(() => {
		// return store.state.user.code.length < 4 ? "Заполните поле кода" : ''
	})
</script>

<style lang="scss">

</style>

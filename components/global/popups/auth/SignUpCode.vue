<template>
	<section class="t-center section popup">
	<!-- Close Popup -->
		<button @click="toggleSignInPopup()" class="button-close-popup button"><img src="@/assets/icons/cross.svg"></button>

		<h2 class="mn-semi">Enter Code</h2>
		<div class="mn-semi">
			<p class="mn-big t-transp p-big">We have sent a registration code to your phone number. Enter it in the box below:</p>

			<div class="input-tel input">
				<input maxlength="4" class="t-center input-text input" @input="updateInputText('user', 'code', $event)">
			</div>
			</div>
		<button @click="validCode" :disabled="!!error" class="w-100 button">Verify</button>
	</section>
</template>
	


<script setup>
	// Import libs
	import { computed, onMounted } from 'vue'
	import { useStore } from 'vuex'
	import { useRoute } from 'vue-router'
	// Accessing router and store
	const store = useStore()
	const route = useRoute()
	// Accessing state
	const user = computed(() => store.state.user)
	const routePath = computed(() => route.name)
	// Validation
	const error = computed(() => {
		return store.state.user.code.length < 4 ? "Заполните поле кода" : ''
	})
	// methods
	function validCode () {
		const rightcode = store.state.signup.code.value.code
		const usercode = store.state.user.code
    if ( rightcode == usercode ) {
  		store.dispatch('validCode')
    } else {
    	store.commit('setCodeError', { response: {status: "Неверный код", data: { message: "Вы ввели неверный код. Попробуйте еще раз."}}})
    }
	}
</script>

<style lang="scss">

</style>

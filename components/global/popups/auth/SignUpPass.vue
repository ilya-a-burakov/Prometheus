<template>
	<section class="t-center section popup">
		<!-- Close Popup -->
		<button @click="Store.auth.toggleSignInPopup()" class="button-close-popup button"><img src="@/assets/icons/cross.svg"></button>
		
		<h2 class="mn-semi">Almost all!</h2>
		<div class="mn-semi">
			<p class="mn-big t-transp p-big">We have verified your phone number. Enter your password and registration is complete.</p> 

			<div class="input-tel input">
				<InputText :obj="'auth'" :prop="'state.user.password'" 		:value="user.password" 		placeholder="Enter password" class="mn-small"/>
				<InputText :obj="'auth'" :prop="'state.user.repeatpassword'" 		:value="user.repeatpassword" 		placeholder="Repeat password" class="mn-small"/>
			</div>
		</div>
		<ButtonSend :submit="onSubmit" :callback="afterSubmit" >Send</ButtonSend>
	</section>  
</template>

<script setup>
	// Import components
	import InputText  from 'prometheus/components/global/elements/InputText.vue'
	import ButtonSend  from 'prometheus/components/global/elements/ButtonSend.vue'
	// Import libs
	import { computed, onMounted } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	
	import * as Store from '@/store';
	// Accessing router and store
	const route = useRoute()
	const router = useRouter()
	// Accessing state
	const user = Store.auth.state.user
	const routePath = computed(() => route.name)

	async function onSubmit() {
		await Store.auth.signup(user)
	} 

	async function afterSubmit() {
    router.push({ name: 'Dashboard'})
	} 
</script>

<style lang="scss">

</style>

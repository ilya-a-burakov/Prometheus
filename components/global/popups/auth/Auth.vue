<template>
	<transition name="scale">
		<div v-if="signin.isOpen" class="popup-wrapper">
			<transition name="scale"> 
				<SignIn  v-if="!signin.signup && signin.isOpen" />
			</transition>

			<transition name="scale">
				<SignUp v-if="signin.signup" />
			</transition>

			<transition name="scale">
				<SignUpCode v-show="signup.code.isSended && !signup.code.isValid" />
			</transition>

			<transition name="scale">
				<SignUpPass v-show="signup.code.isValid"/>
			</transition>

			<div 
		    @click="Store.auth.toggleSignInPopup()" 
		    :class="{'active':true}" 
		    class="color-overlay">
			</div>
		</div>

	</transition>

</template>

<script setup>
	// Import components
import { default as SignIn } from 'prometheus/components/global/popups/auth/SignIn.vue'
import { default as SignUp } from 'prometheus/components/global/popups/auth/SignUp.vue'
import { default as SignUpCode } from 'prometheus/components/global/popups/auth/SignUpCode.vue'
import { default as SignUpPass } from 'prometheus/components/global/popups/auth/SignUpPass.vue'
// Import libs
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Import store
import * as Store from '@/store';
// Accessing router and store
// const store = useStore()
const route = useRoute()
const router = useRouter()
// Accessing state
// const user = computed(() => store.state.user)
const signin = Store.auth.state.status.signin
const signup = Store.auth.state.status.signup
// Methods
function onSubmit() {
  // store.dispatch('users/login', store.state.user).then(() => {
	// 	// router.push({ name: 'Account'}).then(() => {
	// 			store.dispatch("openSignInPopup");
	// 			store.dispatch('resetSignIn')
	// 		// })
	// })
} 
</script>

<style lang="scss">
</style>
